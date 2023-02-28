import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { isAuth } from '../utils/utils.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, createOrder);
orderRouter.get('/');
orderRouter.get('/summary');
orderRouter.get('/mine');
orderRouter.get('/:id');
orderRouter.put('/:id/deliver');
orderRouter.put('/:id/pay');
orderRouter.delete('/:id');

export default orderRouter;
