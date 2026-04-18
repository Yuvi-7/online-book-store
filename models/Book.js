/**
 * models/Book.js — Mongoose Book Schema
 *
 * Represents a book available in the store.
 *
 * Performance:
 *  - Compound index on (title, author) for search queries
 *  - Index on category for category-based filtering
 *  - Index on price for range queries
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },

    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },

    isbn: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple null values (some books may not have ISBN)
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Fiction',
          'Non-Fiction',
          'Science',
          'Technology',
          'History',
          'Biography',
          'Self-Help',
          'Children',
          'Fantasy',
          'Mystery',
          'Romance',
          'Thriller',
          'Horror',
          'Poetry',
          'Other',
        ],
        message: '{VALUE} is not a valid category',
      },
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },

    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },

    coverImage: {
      type: String,
      default: 'https://via.placeholder.com/200x300?text=No+Cover',
    },

    publisher: {
      type: String,
      trim: true,
    },

    publishedYear: {
      type: Number,
      min: [1000, 'Published year must be valid'],
      max: [new Date().getFullYear() + 1, 'Published year cannot be in the future'],
    },

    language: {
      type: String,
      default: 'English',
    },

    pages: {
      type: Number,
      min: [1, 'Pages must be at least 1'],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true, // Soft delete flag
    },
  },
  {
    timestamps: true,
  }
);

// ── Indexes for performance ───────────────────────────────────────────────────
bookSchema.index({ title: 'text', author: 'text', description: 'text' }); // Full-text search
bookSchema.index({ category: 1 });
bookSchema.index({ price: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ isActive: 1 });

// ── Hide version key from JSON output ─────────────────────────────────────────
bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Book', bookSchema);
