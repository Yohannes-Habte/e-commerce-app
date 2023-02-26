import express from 'express';

const orderRouter = express.Router();

orderRouter.get('/');
orderRouter.post('/');
orderRouter.get('/summary');
orderRouter.get('/mine');
orderRouter.get('/:id');
orderRouter.put('/:id/deliver');
orderRouter.put('/:id/pay');
orderRouter.delete('/:id');

export default orderRouter;
