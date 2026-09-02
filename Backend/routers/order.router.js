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

const orderRouter = express.Router();

// Create Order
orderRouter.post("/orders", createOrder);

// Get All Orders
orderRouter.get("/orders", getAllOrders);

// Get Orders by User
orderRouter.get("/orders/user/:userId", getOrdersByUser);

// Get Orders by Vendor Store
orderRouter.get("/orders/vendor/:vendorId", getOrdersByVendor);

// Get Single Order Detail
orderRouter.get("/orders/:id", getOrderById);

// Update Order / Payment Status
orderRouter.put("/orders/:id/status", updateOrderStatus);

// Delete Order
orderRouter.delete("/orders/:id", deleteOrder);

export default orderRouter;
