/**
 * utils/AppError.js — Custom Error Class
 *
 * Used to throw operational errors that can be caught
 * and formatted by the global error handler.
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Indicates it's a predicted error, not a programming bug

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
