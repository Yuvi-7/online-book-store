/**
 * middleware/auth.middleware.js — Authentication & Authorization
 *
 * Checks JWT tokens and user roles.
 */

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const jwtConfig = require('../config/jwt');

exports.protect = async (req, res, next) => {
  try {
    // 1) Get token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Robustly extract the token, handling cases where Postman sends "Bearer Bearer <token>"
      token = req.headers.authorization.replace(/^Bearer\s+/i, '');
      token = token.replace(/^Bearer\s+/i, ''); // Just in case it's repeated
    }

    if (!token || token === 'null' || token === 'undefined') {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    console.log('Token received by backend:', token);

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // 4) Check if user is active
    if (!currentUser.isActive) {
      return next(new AppError('Your account has been deactivated. Please contact support.', 401));
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
