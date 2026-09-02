import express from "express";
import {
  getCartByUser,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

// Get Cart for User
cartRouter.get("/cart/:userId", getCartByUser);

// Add item to cart
cartRouter.post("/cart", addToCart);

// Update cart item quantity
cartRouter.put("/cart/item", updateCartItemQuantity);

// Remove single item from cart
cartRouter.delete("/cart/:userId/item/:productId", removeFromCart);

// Clear entire cart
cartRouter.delete("/cart/:userId", clearCart);

export default cartRouter;
