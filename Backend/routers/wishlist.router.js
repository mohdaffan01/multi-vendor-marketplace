import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const wishlistRouter = express.Router();

// Authenticated Wishlist Routes
wishlistRouter.get("/wishlist", isAuthenticatedUser, getWishlist);
wishlistRouter.get("/wishlist/:userId", isAuthenticatedUser, getWishlist);
wishlistRouter.post("/wishlist", isAuthenticatedUser, addToWishlist);
wishlistRouter.delete("/wishlist/item/:productId", isAuthenticatedUser, removeFromWishlist);
wishlistRouter.delete("/wishlist/:userId/:productId", isAuthenticatedUser, removeFromWishlist);

export default wishlistRouter;
