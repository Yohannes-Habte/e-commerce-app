import express from 'express';
import { createUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup');
userRouter.post('/signin', createUser);
userRouter.get('/');
userRouter.get('/:id');
userRouter.put('/profile');
userRouter.put('/:id');
userRouter.delete('/:id');

export default userRouter;
