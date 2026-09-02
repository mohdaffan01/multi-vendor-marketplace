import express from "express";
import {
  createReview,
  getProductReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router();

// Create Review
reviewRouter.post("/reviews", createReview);

// Get Reviews for Product
reviewRouter.get("/reviews/product/:productId", getProductReviews);

// Delete Review
reviewRouter.delete("/reviews/:id", deleteReview);

export default reviewRouter;
