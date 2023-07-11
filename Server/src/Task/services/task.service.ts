require('dotenv').config();
import 'reflect-metadata';
import { Request, Response, NextFunction, response } from 'express';
import { AppDataSource } from '../../data-source';

import { Order } from '../../models/order.model';
import { Assistant } from '../../models/assistant.model';
import { Task } from '../../models/task.model';
const orderRepository = AppDataSource.getRepository(Order);
const assistantRepository = AppDataSource.getRepository(Assistant);
const taskRepository = AppDataSource.getRepository(Task);

export const checkAssistant = async (aid: string) => {
  const assistant = await assistantRepository.findOne({
    where: {
      id: aid,
    },
  });

  return assistant;
};

export const checkOrder = async (oid: string) => {
  const order = await orderRepository.findOne({
    where: {
      id: oid,
    },
  });

  return order;
};

export const CreateTask = async (
  order: Order,
  assistant: Assistant,
  res: Response
) => {
  const createTask = taskRepository.create({
    order: order,
    assistant: assistant,
  });
  if (!createTask) {
    return res.status(404).json({
      status: 'Error!',
      message: 'The data you provided is invalid while processing!',
    });
  }
  await taskRepository.save(createTask);

  return res.status(200).json({
    status: 'Success!',
    message: 'Task created successfully!',
  });
};

export const ListAllTasks = async (res: Response) => {
  let getTasks = await taskRepository.find({
    relations: {
      order: {
        order_item: {
          product: {
            category: true,
          },
        },
      },

      assistant: true,
    },
  });

  if (!getTasks) {
    return res.status(404).json({
      status: 'Error!',
      message: 'Data fetching error!',
    });
  }
  return res.status(200).json({
    status: 'Success!',
    data: getTasks,
  });
};
