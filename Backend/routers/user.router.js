import express from 'express';
import {
  createUser,
  login,
  logout,
  getProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

// Public User Routes
userRouter.post('/register', createUser);
userRouter.post('/login', login);

// Authenticated User Routes
userRouter.post('/logout', isAuthenticatedUser, logout);
userRouter.get('/me', isAuthenticatedUser, getProfile);
userRouter.put('/users/:id', isAuthenticatedUser, updateUser);

// Admin Only Routes
userRouter.get('/users', isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
userRouter.get('/users/:id', isAuthenticatedUser, authorizeRoles('admin'), getUserById);
userRouter.delete('/users/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default userRouter;
