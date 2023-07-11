require('dotenv').config();
import 'reflect-metadata';
import { Request, Response, NextFunction, response } from 'express';
import { AppDataSource } from '../../data-source';
import Chapa from '../../chapa/chapa';
import { Order_item } from '../../models/order_item.model';
import { Order, paymentStatusMessage } from '../../models/order.model';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';
import axios from 'axios';
const orderItemRepository = AppDataSource.getRepository(Order_item);
const orderRepository = AppDataSource.getRepository(Order);
const customerRepository = AppDataSource.getRepository(Customer);
const productRepository = AppDataSource.getRepository(Product);
var request = require('request');
export const CheckCustomerExistence = async (cid: string) => {
  const user = await customerRepository.findOne({
    where: {
      id: parseInt(cid),
    },
  });
  return user;
};

export const CreateOrder = async (
  // createOrderInterface: ICreateOrder,
  checkUser: Customer,
  res: Response,
  products
) => {

  let newOrder = orderRepository.create({ customer: checkUser });

  let order = await orderRepository.save(newOrder);
  let data: any[] = [];
  let total = 0;
  console.log(products)
  for (let item of products) {
    let product = await productRepository.findOne({
      relations: { category: true },
      where: {
        id: item.id,
      },
    });

    if (product.quantity < item.quantity) {
      return res.status(404).json({
        status: 'Error!',
        message: 'Please decrease the quantity.',
      });
    }
    data.push(item.price * item.quantity);
    let orderItem = orderItemRepository.create({
      order: order,
      product: product,
      quantity: item.quantity,
      total_price: item.price,
    });

    await orderItemRepository.save(orderItem);
    let quan = product.quantity - item.quantity;

    await productRepository.update(
      { id: item.id },
      {
        quantity: quan,
      }
    );
  }

  data.map((e) => {
    total = total + e;
  });
  return res.status(200).json({
    status: 'Success',
    message: 'Order created successfully!',
    total: total,
    orderID: order.id,
  });
};

export const MakePayment = async (
  customer: Customer,
  total_price: number,
  res: Response
) => {
  try {
    let myChapa = new Chapa(process.env.chapa_secretKey);
    const customerInfo = {
      amount: total_price,
      currency: 'ETB',
      email: customer.email,
      first_name: customer.firstName,
      last_name: customer.lastName,
      callback_url: 'https://chapa.co',
      subaccounts: [
        {
          id: '80a510ea-7497-4499-8b49-ac13a3ab7d07',
        },
      ],
    };
 
    let myRef = [];

    myChapa
      .initialize(customerInfo, { autoRef: true })
      .then((response) => {
        myRef.push(response);
        res.status(200).json({
          response,
        });
      })
      .catch((e) => console.log(e)); // catch errors

    console.log(myRef);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};  

export const VerifyPayment = async (
  tx_ref: string,
  orderID: string,
  res: Response
) => {
  var options = {
    method: 'GET',
    url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
    headers: {
      Authorization: `Bearer ${process.env.chapa_secretKey}`,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let myResponse = JSON.parse(response.body);

    if (myResponse.status === 'null') {
      return res.status(404).json({
        status: 'Error!',
        message: myResponse.message,
      });
    } else {
      let updateOrder = orderRepository.update(
        { id: orderID },
        {
          payment_status: paymentStatusMessage.paid,
        }
      );
      return res.status(200).json({
        status: 'Success!',
        message: 'Payment status updated successfully!',
      });
    }
  });
};

export const getOrders = async () => {

     // relations: {
    //   customer : true,
    // },

  const orders = await orderRepository.find({
    relations : {
      customer : true
    },
    select : {
      id : true,
      payment_status : true,
      status : true,
      customer : {
        firstName : true,
        lastName : true,
        email : true
      }
    }
  })

  return orders
}
