/**
 * middleware/validate.js — Joi Validation Middleware
 *
 * Validates request body, query, or params against a Joi schema.
 */

const AppError = require('../utils/AppError');

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false, // Return all errors
      stripUnknown: true, // Remove unknown keys
    });

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new AppError(`Validation error: ${errorMessage}`, 400));
    }

    // Replace req data with validated/transformed data
    req[source] = value;
    next();
  };
};

module.exports = validate;
