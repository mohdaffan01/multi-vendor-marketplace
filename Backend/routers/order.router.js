import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByVendor,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

// Create Order (Logged-in Customer)
orderRouter.post("/orders", isAuthenticatedUser, createOrder);

// Get My Orders
orderRouter.get("/orders/me", isAuthenticatedUser, (req, res, next) => {
  req.params.userId = req.user._id;
  return getOrdersByUser(req, res, next);
});
orderRouter.get("/orders/user/:userId", isAuthenticatedUser, getOrdersByUser);

// Vendor Store Orders
orderRouter.get("/orders/vendor/:vendorId", isAuthenticatedUser, authorizeRoles("vendor", "admin"), getOrdersByVendor);

// Get Single Order Detail
orderRouter.get("/orders/:id", isAuthenticatedUser, getOrderById);

// Admin Routes
orderRouter.get("/orders", isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
orderRouter.put("/orders/:id/status", isAuthenticatedUser, authorizeRoles("vendor", "admin"), updateOrderStatus);
orderRouter.delete("/orders/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default orderRouter;
