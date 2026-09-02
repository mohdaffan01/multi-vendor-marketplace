import Wishlist from "../models/wishlist.model.js";

// ---------------------------- Get User Wishlist ----------------------------
export const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    let wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products",
      "name price images category stock"
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }

    return res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Add to Wishlist ----------------------------
export const addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.body.userId;
    const { productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    wishlist = await Wishlist.findById(wishlist._id).populate(
      "products",
      "name price images category stock"
    );

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Remove from Wishlist ----------------------------
export const removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.params.userId;
    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};
