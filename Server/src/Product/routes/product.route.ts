import * as express from 'express';
import { Request } from 'express';
import { verifyToken } from '../../Customer/middlewares/token-validation-middleware';

import * as productController from '../controllers/product.controller';
import { uploadImage } from '../controllers/product.controller';

const productRouter = express.Router();

productRouter.post('/create', uploadImage , productController.CreateProduct);
productRouter.post('/createCategory', productController.AddCategory);
productRouter.get('/getProducts', productController.getProducts)
productRouter.get('/searchProducts',productController.searchProducts)
productRouter.get('/getCategories',productController.getCategories)
productRouter.get('/getProductsByCategory/:categoryID',productController.getProductsByCategory)
productRouter.get('/getProductById/:productID',productController.getProductById)
productRouter.get('/checkValidation',verifyToken, productController.checkValidation)
productRouter.get('/countCustomer',productController.numberOfCustomers)
productRouter.get('/countOrder',productController.numberOfOrders)
productRouter.get('/countProduct',productController.numberOfProducts)

export { productRouter };
