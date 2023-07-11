import * as express from 'express';
const orderRouter = express.Router();
import * as ordersController from '../controllers/orders.controller';

orderRouter.post('/CreateOrder/:cid', ordersController.CreateOrder);
orderRouter.post('/MakePayment/:cid/:total', ordersController.MakePayment);
orderRouter.get('/verify/:ref/:oid', ordersController.VerifyPayment);
orderRouter.get('/getOrders', ordersController.getOrders)
export { orderRouter };
