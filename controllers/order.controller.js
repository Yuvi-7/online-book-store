/**
 * controllers/order.controller.js — Order Logic
 */

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

exports.createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;

    // 1) Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.book');

    if (!cart || cart.items.length === 0) {
      return next(new AppError('Your cart is empty', 400));
    }

    // 2) Verify stock and prepare order items
    const orderItems = [];
    for (const item of cart.items) {
      const book = await Book.findById(item.book._id);
      if (!book || !book.isActive) {
        return next(new AppError(`Book ${item.book.title} is no longer available`, 400));
      }
      if (book.stock < item.quantity) {
        return next(new AppError(`Insufficient stock for ${book.title}. Available: ${book.stock}`, 400));
      }
      
      orderItems.push({
        book: item.book._id,
        title: book.title,
        quantity: item.quantity,
        price: item.price,
      });

      // Reduce stock
      book.stock -= item.quantity;
      await book.save();
    }

    // 3) Create Order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount: cart.totalPrice,
      shippingAddress,
      status: 'pending',
      paymentStatus: 'unpaid'
    });

    // 4) Empty cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const features = new APIFeatures(Order.find({ user: req.user.id }), req.query)
      .filter()
      .sort()
      .paginate();

    const orders = await features.query;

    res.status(200).json({
      success: true,
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    // Only allow user who created order OR admin to view it
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to view this order', 403));
    }

    res.status(200).json({
      success: true,
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Admin only
exports.getAllOrders = async (req, res, next) => {
  try {
    const features = new APIFeatures(Order.find(), req.query)
      .filter()
      .sort()
      .paginate();

    const orders = await features.query.populate('user', 'name email');

    res.status(200).json({
      success: true,
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return next(new AppError('Please provide a status', 400));
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};
