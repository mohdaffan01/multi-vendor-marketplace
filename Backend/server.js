import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user.router.js';
import productRouter from './routers/product.router.js';
import categoryRouter from './routers/category.router.js';
import vendorRouter from './routers/vendor.router.js';
import cartRouter from './routers/cart.router.js';
import orderRouter from './routers/order.router.js';
import reviewRouter from './routers/review.router.js';
import wishlistRouter from './routers/wishlist.router.js';
import { errorMiddleware } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
// Start Server
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Base / Health Check Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Multi-Vendor Marketplace API is up and running!',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

// API Routes
app.use(userRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(vendorRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(reviewRouter);
app.use(wishlistRouter);

// Global Error Middleware
app.use(errorMiddleware);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:3000/`);
  });
}).catch((error) => {
  console.log('Error connecting to MongoDB', error);
});
