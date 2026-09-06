import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import mongoose from "mongoose";

//----------------------------------Create a Product --------------------------------

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    // Check required fields
    if (
      !data?.name?.trim() ||
      !data?.description?.trim() ||
      data?.price === undefined ||
      !data?.category
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields (name, description, price, category) must be provided",
      });
    }

    if (data.price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative!",
      });
    }

    let categoryObjectId = data.category;
    if (!mongoose.Types.ObjectId.isValid(data.category)) {
      let foundCategory = await Category.findOne({ name: data.category.toString().trim() });
      if (!foundCategory) {
        foundCategory = await Category.create({ name: data.category.toString().trim() });
      }
      categoryObjectId = foundCategory._id;
    }

    const imagesList = Array.isArray(data.images) && data.images.length > 0
      ? data.images
      : (data.image ? [data.image] : ["https://lh3.googleusercontent.com/aida-public/AB6AXuB75pvqsIQz67iL1jCeDpgNEzx5cjxV2DuwD62PXJGmlRRtCfz1RH6ZPRcat8KNc6Nx48S6JPw6saBUr8YRmnkfJlnlY_lFIukpZhAz0GngN1NyiaPgGOLq4t2jGzyEDYha0RzCbRYU6zUxYsZhkKUuwUvI4hY7moJL7aEpmOMXUHz1DpR8O1KzfAlIecHA3tbcq-zn3YPzs_2W8DHbg-r-AYcUxZ8QwyCpM2GJNqirzdZ_E5LvbGRS"]);

    // Create Product
    const product = await Product.create({
      name: data.name.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      category: categoryObjectId,
      stock: data.stock !== undefined ? Number(data.stock) : 10,
      images: imagesList,
      vendor: data.vendor || null,
      sellerUser: req.user?._id || data.sellerUser || null,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully and saved to MongoDB",
      product,
    });

  } catch (error) {
    next(error);
  }
};


// ---------------------------- Get All Products (with filters) ----------------------------

export const getAllProducts = async (req, res, next) => {
  try {
    const { category, vendor, keyword } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (vendor) {
      filter.vendor = vendor;
    }

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    const products = await Product.find(filter)
      .populate("category", "name description")
      .populate("vendor", "storeName logo")
      .populate("sellerUser", "name email");

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    next(error);
  }
};


// ---------------------------- Get Single Product ----------------------------

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category", "name description")
      .populate("vendor", "storeName logo phone")
      .populate("sellerUser", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    next(error);
  }
};


// ---------------------------- Update Product ----------------------------

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    next(error);
  }
};


// ---------------------------- Delete Product ----------------------------

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};
