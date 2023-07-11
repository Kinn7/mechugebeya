import * as express from 'express';
const taskRouter = express.Router();
import * as taskController from '../controllers/task.controller';
taskRouter.post('/createTask/:aid/:oid', taskController.CreateTask);
taskRouter.get('/getAllTasks', taskController.ListAllTasks);
export { taskRouter };
