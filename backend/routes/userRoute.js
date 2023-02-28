import express from 'express';
import { signinUser, signupUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/signin', signinUser);
userRouter.get('/');
userRouter.get('/:id');
userRouter.put('/profile');
userRouter.put('/:id');
userRouter.delete('/:id');

export default userRouter;
