import * as express from 'express';
import { Request } from 'express';

import * as productController from '../controllers/product.controller';
import { uploadImage } from '../controllers/product.controller';

const productRouter = express.Router();

productRouter.post('/create', uploadImage , productController.CreateProduct);
productRouter.post('/createCategory', productController.AddCategory);
productRouter.get('/getProducts', productController.getProducts)
productRouter.get('/getCategories',productController.getCategories)
productRouter.get('/getProductsByCategory/:categoryID',productController.getProductsByCategory)

export { productRouter };
