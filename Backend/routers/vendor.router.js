import express from "express";
import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from "../controllers/vendor.controller.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.middleware.js";

const vendorRouter = express.Router();

// Public Routes
vendorRouter.get("/vendors", getAllVendors);
vendorRouter.get("/vendors/:id", getVendorById);

// Protected Routes
vendorRouter.post("/vendors", isAuthenticatedUser, authorizeRoles("vendor", "admin"), createVendor);
vendorRouter.put("/vendors/:id", isAuthenticatedUser, authorizeRoles("vendor", "admin"), updateVendor);
vendorRouter.delete("/vendors/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteVendor);

export default vendorRouter;
