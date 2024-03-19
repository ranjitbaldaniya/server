import express from 'express';
import { getAllUsersController } from '../controller/userController.js';


export const userRouter = express.Router();


userRouter.get("/users" , getAllUsersController)