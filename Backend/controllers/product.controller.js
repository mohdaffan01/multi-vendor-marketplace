import Product from "../models/product.model.js";

//----------------------------------Create a Product --------------------------------

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    // Check required fields
    if (
      !data?.name?.trim() ||
      !data?.description?.trim() ||
      data?.price === undefined ||
      !data?.category?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (data.price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative!",
      });
    }

    // Create Product
    const product = await Product.create({
      name: data.name.trim(),
      description: data.description.trim(),
      price: data.price,
      category: data.category.trim(),
      stock: data.stock || 0,
      vendor: data.vendor,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    next(error);
  }
};


// ---------------------------- Get All Products ----------------------------

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("vendor", "name email");

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
    const product = await Product.findById(id).populate("vendor", "name email");

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
