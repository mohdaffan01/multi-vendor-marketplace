import express from 'express';
import {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, } from '../controllers/product.controller.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.middleware.js';

const productRouter = express.Router();

productRouter.get('/products', getAllProducts);

productRouter.get('/products/:id', getProductById);

productRouter.post('/products',isAuthenticatedUser,authorizeRoles('vendor','admin') , createProduct);

productRouter.put('/products/:id',isAuthenticatedUser,authorizeRoles('vendor','admin') ,updateProduct);  

productRouter.delete('/products/:id',isAuthenticatedUser ,authorizeRoles('vendor','admin') ,deleteProduct);

export default productRouter;
