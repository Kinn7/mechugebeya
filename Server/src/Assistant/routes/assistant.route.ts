import * as express from 'express';
const assistantRouter = express.Router();
import * as assistantController from '../controller/assistant.controller';
assistantRouter.post('/signup', assistantController.AssistantSignUp);
assistantRouter.post('/signin', assistantController.AssistantSignin);
assistantRouter.get('/assistants', assistantController.getAssistants)

export { assistantRouter };
