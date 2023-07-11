require('dotenv').config();
import { Like } from 'typeorm';
import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source';
import { Dispatcher } from '../../models/dispatcher.model';
import { Product } from '../../models/product.model';
import {
  AddCategoryInterface,
  CreateProductInterface,
} from '../../utils/products.interface';
import { Category } from '../../models/category.model';
import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);
const customerRepository = AppDataSource.getRepository(Customer)
const orderRepository = AppDataSource.getRepository(Order)

//checking if the category exists
export const CheckCategory = async(categoryID:string,res : Response) =>{

  let checkCategory = await categoryRepository.find({
    where:{
      id : parseInt(categoryID),
    }
  })

  //if the query above don't find any category we don't add category to product and we add HttpError(for now)
  if (!checkCategory) {
   // throw new HttpError('No such category!', 400);
    return false
  }
  else {
    return checkCategory;
  }
 
}
//product creation
export const CreateProduct = async (
  createProductInterface: CreateProductInterface,
  res : Response
) => {
  let { category, ...others } = createProductInterface;
  //let {categoryid , ...others2} = addCategoryInterface;
  

  // let checkCategory = await productRepository.find({
  //   where: {
  //     name: category,
  //   },
  // });

  //select where category.id is equal to product.categoryId
  let checkCategory = await categoryRepository.findOne({
    where:{
      id : category,
    }
  })

  //if the query above don't find any category we don't add category to product and we add HttpError(for now)
  if (!checkCategory) {
   // throw new HttpError('No such category!', 400);
    return res.status(404).json({status : 'failure' ,message : 'No such Category!'})
  }

  //if category is found we continue to add info to our product table
  let product = productRepository.create({
    ...others,
    category : checkCategory
  //categoryID: checkCategory,
  });
       res.status(200).json({
        message: 'Products Created Successfully!',
      });
  return await productRepository.save(product);
};


//Adding Category
export const AddCategory = async (
  addCategoryInterface: AddCategoryInterface
) => {
  let product = categoryRepository.create(addCategoryInterface);

  return await categoryRepository.save(product);
};

export const getProducts = async() => {
  let productList =  await productRepository.find({
    select : {
      name : true,
      price : true,
    }
  })

  return productList;
}

export const getProductById = async(productID:number) => {
  let singleProduct = await productRepository.find({
    where : {
      id : productID
    }
  })
  return singleProduct
}

export const getCategories = async() => {
  let categoryList = await categoryRepository.find({
    select : {
      id : true,
      name : true,
    }
  })
  return categoryList;
}

export const searchProducts = async(products:string) => {
  let product = await productRepository.find({
    where : {
      name : Like(`${products}%`)
    }
  })
  return product;
}

export const getProductsByCategory = async(category:string) => {
 let productLists = await productRepository.find({
  where:{
      category:{
        id: parseInt(category)
      }
  }
 })  
 return productLists; 
}

export const numberOfCustomers = async() => {
  let noOfCustomer = await customerRepository.count()
  return noOfCustomer
}

export const numberOfOrders = async() => {
  let noOfOrders = await orderRepository.count()
  return noOfOrders
}

export const numberOfProducts = async() => {
  let noOfProducts = await productRepository.count()
  return noOfProducts 
}