import { Router } from 'express';
import validateSchema from '../middleware/validateSchemaMiddleware.js';
import { signSchema } from '../schemas/userSchema.js';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/sign-up', validateSchema(signSchema), userController.signUp);

userRouter.post('/sign-in', validateSchema(signSchema), userController.signIn);

export default userRouter;
