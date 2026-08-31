import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const productRouter = express.Router();

// Create Product
productRouter.post('/products', createProduct);

// Get All Products
productRouter.get('/products', getAllProducts);

// Get Single Product
productRouter.get('/products/:id', getProductById);

// Update Product
productRouter.put('/products/:id', updateProduct);

// Delete Product
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
