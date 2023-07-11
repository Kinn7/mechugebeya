import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Customer } from './models/customer.model';
import { Product } from './models/product.model';
import { Category } from './models/category.model';
import { Dispatcher } from './models/dispatcher.model';
import { Order } from './models/order.model';
import { Order_item } from './models/order_item.model';
import { Assistant } from './models/assistant.model';
import { Task } from './models/task.model';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'mechugebeya',
  synchronize: true,
  logging: false,
  entities: [
    Customer,
    Product,
    Category,
    Dispatcher,
    Order,
    Order_item,
    Assistant,
    Task,
  ],
  migrations: [],
  subscribers: [],
});
