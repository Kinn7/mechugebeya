import { AppDataSource } from './data-source';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { authRouter } from './Customer/routes/customer-auth.route';
import { dispatcherAuthRouter } from './Dispatcher/routes/dispatcher-auth.route';
import { productRouter } from './Product/routes/product.route';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from './Product/services/product.service';

const app = express();
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: '*',
    allowedHeaders: '*',
  })
);
const server = http.createServer(app);
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log('Database started sucessfully!');
  })
  .catch((error) => console.log(error));

app.use('/api/customer', authRouter);
app.use('/api/dispatcher', dispatcherAuthRouter);
app.use('/api/product', productRouter);
//global exception handling route
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.statusCode || 400;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    status: err.statusCode,
    message: errorMessage,
    // stack: err.stack,
  });
});

server.listen(7000, () => {
  console.log('Server started successfully');
});
