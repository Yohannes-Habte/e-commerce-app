import express from 'express';
import { createOrder, getOrder, payOrder, singleUserOrders } from '../controllers/orderController.js';
import { isAuth } from '../utils/utils.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, createOrder);
orderRouter.get('/:id', getOrder);
orderRouter.put('/:id/pay', isAuth, payOrder);
orderRouter.get('/user/orders', isAuth, singleUserOrders);
orderRouter.get('/');
orderRouter.get('/summary');
orderRouter.put('/:id/deliver');
orderRouter.delete('/:id');

export default orderRouter;
