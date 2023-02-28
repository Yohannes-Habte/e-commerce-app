import express from 'express';
import { signinUser, signupUser, updateUserProfile } from '../controllers/userController.js';
import { isAuth } from '../utils/utils.js';

const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/signin', signinUser);
userRouter.get('/');
userRouter.get('/:id');
userRouter.put('/profile', isAuth, updateUserProfile);
userRouter.put('/:id');
userRouter.delete('/:id');

export default userRouter;
