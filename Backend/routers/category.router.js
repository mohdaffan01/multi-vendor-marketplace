import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.middleware.js";

const categoryRouter = express.Router();

// Public Routes
categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/categories/:id", getCategoryById);

// Admin Protected Routes
categoryRouter.post("/categories", isAuthenticatedUser, authorizeRoles("admin"), createCategory);
categoryRouter.put("/categories/:id", isAuthenticatedUser, authorizeRoles("admin"), updateCategory);
categoryRouter.delete("/categories/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

export default categoryRouter;
