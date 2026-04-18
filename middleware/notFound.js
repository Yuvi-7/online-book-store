/**
 * middleware/notFound.js — 404 Handler
 *
 * Catches requests to unhandled routes.
 */

const AppError = require('../utils/AppError');

exports.notFound = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};
