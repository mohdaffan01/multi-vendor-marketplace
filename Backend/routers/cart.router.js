import express from "express";
import {
  getCartByUser,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const cartRouter = express.Router();

// Authenticated Cart Routes
cartRouter.get("/cart", isAuthenticatedUser, getCartByUser);
cartRouter.get("/cart/:userId", isAuthenticatedUser, getCartByUser);
cartRouter.post("/cart", isAuthenticatedUser, addToCart);
cartRouter.put("/cart/item", isAuthenticatedUser, updateCartItemQuantity);
cartRouter.delete("/cart/item/:productId", isAuthenticatedUser, removeFromCart);
cartRouter.delete("/cart/:userId/item/:productId", isAuthenticatedUser, removeFromCart);
cartRouter.delete("/cart", isAuthenticatedUser, clearCart);
cartRouter.delete("/cart/:userId", isAuthenticatedUser, clearCart);

export default cartRouter;
