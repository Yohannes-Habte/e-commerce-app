import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import data from './data.js';

import uploadRouter from './routes/uploadRoute.js';
import seedRouter from './routes/seedRoute.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Step 2: create API for the paypal
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); // sb = Sandbox

});
const port = process.env.PORT || 9000;

dotenv.config();

const connected = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB is connected');
  } catch (error) {
    console.log(error.message);
  }
};

// Middleware - Every changes will be informed
app.use(morgan('tiny'));

app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// Global error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  connected();
  console.log(`The server started on port ${port}`);
});
