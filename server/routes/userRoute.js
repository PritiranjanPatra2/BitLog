import express from 'express';
import { allUser, isUser, login, logout, register } from '../controllers/userController.js';
import { authUser } from '../middlewares/authUser.js';
const userRouter=express.Router();
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/isauth',authUser,isUser)
userRouter.get('/logout',authUser,logout);
userRouter.get('/alluser',allUser)
export default userRouter;