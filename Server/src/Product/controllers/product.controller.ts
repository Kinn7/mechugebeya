import { NextFunction, Response, Request, RequestHandler } from 'express';
import * as multer from 'multer';
import { isDate } from 'date-fns';
import productService = require('../services/product.service');
import { validate } from 'class-validator';
import { AddCategoryDto, CreateProductDto } from '../dto/product.dto';
import { HttpError } from '../services/product.service';
``
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `C:/Final_Project/`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    req.body.image = `product-${Date.now()}.${ext}`;
    cb(null, req.body.image);
  },
});
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('jpeg') ||
    file.mimetype.includes('png') ||
    file.mimetype.includes('jpg')
  ) {
    cb(null, true);
  } else {
    const error = new HttpError('Only image files are allowed.', 400);

    cb(error, false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
export const uploadImage = upload.single('image');

export async function CreateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isDate(new Date(req.body?.expiry_date))) {
    req.body.expiry_date = new Date(req.body.expiry_date);
  }
  let createProductDto = new CreateProductDto();
  createProductDto.name = req.body.name;
  createProductDto.price = parseInt(req.body.price);
  createProductDto.expiry_date = req.body.expiry_date;
  createProductDto.quantity = parseInt(req.body.quantity);
 // createProductDto.image = req.body.image;
  createProductDto.category =  parseInt(req.body.category);

  validate(createProductDto).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      //   console.log(errors[0].constraints);
       res.status(404).json({
        message: errors[0].constraints,
      });
    } else {

      productService.CreateProduct(createProductDto,res);
      //  res.status(200).json({
      //   message: 'Products Created Successfully!',
      // });
    }
  });
}

export async function AddCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let addCategoryDto = new AddCategoryDto();
  addCategoryDto.name = req.body.name;

  validate(addCategoryDto).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      //   console.log(errors[0].constraints);
      res.status(404).json({
        message: errors[0].constraints,
      });
    } else {
      productService.AddCategory(addCategoryDto);
      res.status(200).json({
        message: 'Category Created Successfully!',
      });
    }
  });
}

export async function getProducts(req : Request, res: Response, next:NextFunction){
  res.status(200).json(await productService.getProducts())
}


export async function getCategories(req:Request, res: Response, next:NextFunction){
  res.status(200).json(await productService.getCategories())
}

export async function getProductsByCategory(req:Request, res: Response, next: NextFunction){
  let categoryID:string = req.params.categoryID;
  let checkCategory = await productService.CheckCategory(categoryID,res);
  if(checkCategory){
    res.status(200).json(await productService.getProductsByCategory(categoryID))
  }
  else {
    res.status(404).json({status : 'failure' ,message : 'No such Category!'})
  }
 
}
