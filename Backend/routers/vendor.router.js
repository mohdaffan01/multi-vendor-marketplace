import express from "express";
import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from "../controllers/vendor.controller.js";

const vendorRouter = express.Router();

// Create Vendor Store
vendorRouter.post("/vendors", createVendor);

// Get All Vendor Stores
vendorRouter.get("/vendors", getAllVendors);

// Get Single Vendor Store
vendorRouter.get("/vendors/:id", getVendorById);

// Update Vendor Store
vendorRouter.put("/vendors/:id", updateVendor);

// Delete Vendor Store
vendorRouter.delete("/vendors/:id", deleteVendor);

export default vendorRouter;
