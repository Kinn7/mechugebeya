import { NextFunction, Request, Response } from 'express';
import taskService = require('../services/task.service');

export async function CreateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let aid = req.params.aid;
  let oid = req.params.oid;

  let assistant = await taskService.checkAssistant(aid);

  let order = await taskService.checkOrder(oid);

  return taskService.CreateTask(order, assistant, res);
}

export async function ListAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return taskService.ListAllTasks(res);
}
