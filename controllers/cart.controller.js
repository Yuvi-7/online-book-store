/**
 * controllers/cart.controller.js — Cart Logic
 */

const Cart = require('../models/Cart');
const Book = require('../models/Book');
const AppError = require('../utils/AppError');

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.book', 'title price coverImage');

    if (!cart) {
      // Return empty cart if none exists
      return res.status(200).json({
        success: true,
        data: {
          cart: { items: [], totalPrice: 0 },
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        cart,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;

    const book = await Book.findById(bookId);
    if (!book || !book.isActive) {
      return next(new AppError('Book not found or unavailable', 404));
    }

    if (book.stock < quantity) {
      return next(new AppError(`Only ${book.stock} items left in stock`, 400));
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: req.user.id,
        items: [{ book: bookId, quantity, price: book.price }],
      });
    } else {
      // Cart exists, check if item already in cart
      const itemIndex = cart.items.findIndex((item) => item.book.toString() === bookId);

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ book: bookId, quantity, price: book.price });
      }
      await cart.save();
    }

    // Populate for response
    await cart.populate('items.book', 'title price coverImage');

    res.status(200).json({
      success: true,
      data: {
        cart,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCartItemQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params; // Note: This is the cartItem's _id, not the book ID

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return next(new AppError('Item not found in cart', 404));
    }

    // Check stock
    const book = await Book.findById(cart.items[itemIndex].book);
    if (book.stock < quantity) {
      return next(new AppError(`Only ${book.stock} items left in stock`, 400));
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.book', 'title price coverImage');

    res.status(200).json({
      success: true,
      data: {
        cart,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    
    await cart.save();
    await cart.populate('items.book', 'title price coverImage');

    res.status(200).json({
      success: true,
      data: {
        cart,
      },
    });
  } catch (err) {
    next(err);
  }
};
