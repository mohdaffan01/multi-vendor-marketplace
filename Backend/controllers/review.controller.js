import Review from "../models/review.model.js";
import Product from "../models/product.model.js";

// Helper function to update product average rating
const updateProductRatings = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const numReviews = reviews.length;
  const avgRating =
    numReviews === 0
      ? 0
      : reviews.reduce((sum, item) => sum + item.rating, 0) / numReviews;

  await Product.findByIdAndUpdate(productId, {
    ratings: avgRating,
    numReviews: numReviews,
  });
};

// ---------------------------- Create Review ----------------------------
export const createReview = async (req, res, next) => {
  try {
    const { product, user, rating, comment } = req.body;

    if (!product || !user || !rating || !comment?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product, user, rating (1-5), and comment are required",
      });
    }

    const review = await Review.create({
      product,
      user,
      rating: Number(rating),
      comment: comment.trim(),
    });

    await updateProductRatings(product);

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Get Product Reviews ----------------------------
export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Delete Review ----------------------------
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const productId = review.product;
    await review.deleteOne();
    await updateProductRatings(productId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
