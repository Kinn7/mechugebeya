import { NextFunction, Request, Response, response } from 'express';
import ordersService = require('../services/orders.service');
import { validate, validateOrReject } from 'class-validator';
import { CreateOrderDto } from '../dtos/orders.dto';

export async function CreateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let cid = req.params.cid;
  let products = req.body.products;

  console.log(products)
  

  let checkUser = await ordersService.CheckCustomerExistence(cid);

  if (!checkUser) {
    return res.status(404).json({
      status: 'Error!',
      message: "Sorry, user doesn't exist",
    });
  }
  ordersService.CreateOrder(
    // createOrderDto,
    checkUser,
    res,
    products
  );
}
 
export async function MakePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let cid = req.params.cid;
  let total_price: number = parseInt(req.params.total);

  let checkUser = await ordersService.CheckCustomerExistence(cid);

  if (!checkUser) {
    return res.status(404).json({
      status: 'Error!',
      message: "Sorry, user doesn't exist",
    });
  }

  await ordersService.MakePayment(checkUser, total_price, res);
}

export async function VerifyPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let tx_ref = req.params.ref;
  let orderID = req.params.oid;

  return ordersService.VerifyPayment(tx_ref, orderID, res);
}

export async function getOrders(req: Request, res:Response, next:NextFunction){
  try {
    return res.status(200).json(await ordersService.getOrders())
  }catch(Exception){
    return res.status(401).json({msg: "Invalid request"})
  }
} 