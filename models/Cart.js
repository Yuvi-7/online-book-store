/**
 * models/Cart.js — Mongoose Cart Schema
 *
 * Represents a user's shopping cart.
 * Links to the User and Book models.
 */

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less than 1.'],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One cart per user
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to calculate total price before saving
cartSchema.pre('save', function (next) {
  this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
