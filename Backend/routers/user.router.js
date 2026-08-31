import express from 'express';
import { createUser, login, getAllUsers, deleteUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

// User Registration
userRouter.post('/register', createUser);

// User Login
userRouter.post('/login', login);

// Get All Users
userRouter.get('/users', getAllUsers);

// Delete User
userRouter.delete('/users/:id', deleteUser);

export default userRouter;
