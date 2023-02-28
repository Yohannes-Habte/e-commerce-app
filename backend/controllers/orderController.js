import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import createError from 'http-errors';

//===================================================================
// Post an Order
//===================================================================

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id, // user comes from the isAuth
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  } catch (error) {
    console.log(error)
    next(createError(404, 'Order is not placed. Please try again?'));
  }
};
