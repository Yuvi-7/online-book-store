/**
 * controllers/book.controller.js — Book Logic
 */

const Book = require('../models/Book');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllBooks = async (req, res, next) => {
  try {
    const features = new APIFeatures(Book.find({ isActive: true }), req.query)
      .filter()
      .sort()
      .paginate();

    const books = await features.query;

    // Count total for pagination
    const countFeatures = new APIFeatures(Book.find({ isActive: true }), req.query).filter();
    const total = await countFeatures.query.countDocuments();

    res.status(200).json({
      success: true,
      results: books.length,
      total,
      data: {
        books,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, isActive: true });

    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        book,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        book,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    // Soft delete
    const book = await Book.findByIdAndUpdate(req.params.id, { isActive: false });

    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }

    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
