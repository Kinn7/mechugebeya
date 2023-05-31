import * as express from 'express';
const authRouter = express.Router();
import * as authController from '../controllers/customer-auth.controller';

authRouter.post('/signup', authController.CustomerSignUp);
authRouter.post('/signin', authController.CustomerSignin);

export { authRouter };
