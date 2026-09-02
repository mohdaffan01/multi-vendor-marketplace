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

    // Create Product
    const product = await Product.create({
      name: data.name.trim(),
      description: data.description.trim(),
      price: data.price,
      category: data.category,
      stock: data.stock || 0,
      images: data.images || [],
      vendor: data.vendor || null,
      sellerUser: req.user?._id || data.sellerUser || null,
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
