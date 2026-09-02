import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Helper function to recalculate cart total
const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// ---------------------------- Get Cart By User ----------------------------
export const getCartByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ user: userId })
      .populate("items.product", "name price images stock category")
      .populate("items.vendor", "storeName logo");

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Add Item to Cart ----------------------------
export const addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        vendor: product.vendor || null,
        quantity: Number(quantity),
        price: product.price,
      });
    }

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    cart = await Cart.findById(cart._id)
      .populate("items.product", "name price images stock")
      .populate("items.vendor", "storeName logo");

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Update Cart Item Quantity ----------------------------
export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "User ID, Product ID, and Quantity are required",
      });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = Number(quantity);
    }

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    cart = await Cart.findById(cart._id)
      .populate("items.product", "name price images stock")
      .populate("items.vendor", "storeName logo");

    return res.status(200).json({
      success: true,
      message: "Cart item updated",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Remove Item from Cart ----------------------------
export const removeFromCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Clear Cart ----------------------------
export const clearCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};
