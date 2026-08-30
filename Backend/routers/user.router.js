import express from 'express';
import { createUser, login } from '../controllers/user.controller.js';

const userRouter = express.Router();

// User Registration
userRouter.post('/register', createUser);

// User Login
userRouter.post('/login', login);

export default userRouter;
