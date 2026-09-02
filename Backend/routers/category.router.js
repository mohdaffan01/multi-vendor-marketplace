import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

// Create Category
categoryRouter.post("/categories", createCategory);

// Get All Categories
categoryRouter.get("/categories", getAllCategories);

// Get Single Category
categoryRouter.get("/categories/:id", getCategoryById);

// Update Category
categoryRouter.put("/categories/:id", updateCategory);

// Delete Category
categoryRouter.delete("/categories/:id", deleteCategory);

export default categoryRouter;
