import * as express from 'express';
const dispatcherAuthRouter = express.Router();
import * as authController from '../controllers/dispatcher-auth.controller';

dispatcherAuthRouter.post('/signup', authController.DispatcherSignUp);
dispatcherAuthRouter.post('/signup', authController.DispatcherSignUp);

export { dispatcherAuthRouter };
