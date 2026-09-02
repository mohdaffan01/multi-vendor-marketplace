import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";

const wishlistRouter = express.Router();

// Get Wishlist for user
wishlistRouter.get("/wishlist/:userId", getWishlist);

// Add product to wishlist
wishlistRouter.post("/wishlist", addToWishlist);

// Remove product from wishlist
wishlistRouter.delete("/wishlist/:userId/:productId", removeFromWishlist);

export default wishlistRouter;
