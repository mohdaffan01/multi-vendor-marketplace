import express from "express";
import {
  createReview,
  getProductReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const reviewRouter = express.Router();

// Public Route
reviewRouter.get("/reviews/product/:productId", getProductReviews);

// Protected Routes
reviewRouter.post("/reviews", isAuthenticatedUser, createReview);
reviewRouter.delete("/reviews/:id", isAuthenticatedUser, deleteReview);

export default reviewRouter;
