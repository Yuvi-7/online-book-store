/**
 * utils/validators.js — Joi Validation Schemas
 *
 * Centralizes all request validation schemas.
 */

const Joi = require('joi');

const authSchemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').default('user'),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const bookSchemas = {
  createBook: Joi.object({
    title: Joi.string().max(200).required(),
    author: Joi.string().max(100).required(),
    description: Joi.string().max(2000).allow(''),
    isbn: Joi.string().allow(''),
    category: Joi.string().valid(
      'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History',
      'Biography', 'Self-Help', 'Children', 'Fantasy', 'Mystery',
      'Romance', 'Thriller', 'Horror', 'Poetry', 'Other'
    ).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    coverImage: Joi.string().uri().allow(''),
    publisher: Joi.string().allow(''),
    publishedYear: Joi.number().min(1000).max(new Date().getFullYear() + 1),
    language: Joi.string().default('English'),
    pages: Joi.number().min(1),
  }),
  updateBook: Joi.object({
    title: Joi.string().max(200),
    author: Joi.string().max(100),
    description: Joi.string().max(2000).allow(''),
    isbn: Joi.string().allow(''),
    category: Joi.string().valid(
      'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History',
      'Biography', 'Self-Help', 'Children', 'Fantasy', 'Mystery',
      'Romance', 'Thriller', 'Horror', 'Poetry', 'Other'
    ),
    price: Joi.number().min(0),
    stock: Joi.number().min(0),
    coverImage: Joi.string().uri().allow(''),
    publisher: Joi.string().allow(''),
    publishedYear: Joi.number().min(1000).max(new Date().getFullYear() + 1),
    language: Joi.string().default('English'),
    pages: Joi.number().min(1),
    isActive: Joi.boolean(),
  }),
};

const cartSchemas = {
  addToCart: Joi.object({
    bookId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
      'string.pattern.base': 'Invalid Book ID format',
    }),
    quantity: Joi.number().min(1).default(1),
  }),
  updateQuantity: Joi.object({
    quantity: Joi.number().min(1).required(),
  }),
};

const orderSchemas = {
  createOrder: Joi.object({
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
  }),
};

module.exports = {
  authSchemas,
  bookSchemas,
  cartSchemas,
  orderSchemas,
};
