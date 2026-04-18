/**
 * config/jwt.js — JWT Configuration Constants
 *
 * Centralises JWT secret and expiry so they are never
 * hard-coded anywhere else in the codebase.
 */

module.exports = {
  secret: process.env.JWT_SECRET || 'fallback_secret_change_in_production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
