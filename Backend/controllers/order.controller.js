import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

// ---------------------------- Create Order ----------------------------
export const createOrder = async (req, res, next) => {
  try {
    const { user, items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!user || !items || items.length === 0 || !shippingAddress || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "User, items, shipping address, and total amount are required",
      });
    }

    const order = await Order.create({
      user,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      totalAmount,
    });

    // Automatically clear user cart after placing order
    await Cart.findOneAndUpdate({ user }, { items: [], totalPrice: 0 });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Get All Orders ----------------------------
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price")
      .populate("items.vendor", "storeName");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Get Single Order ----------------------------
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user", "name email phone")
      .populate("items.product", "name price images")
      .populate("items.vendor", "storeName logo phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Get User Orders ----------------------------
export const getOrdersByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price images")
      .populate("items.vendor", "storeName");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Get Vendor Orders ----------------------------
export const getOrdersByVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const orders = await Order.find({ "items.vendor": vendorId })
      .populate("user", "name email")
      .populate("items.product", "name price");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Update Order Status ----------------------------
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Delete Order ----------------------------
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
