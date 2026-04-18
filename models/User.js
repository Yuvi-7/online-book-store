/**
 * models/User.js — Mongoose User Schema
 *
 * Stores registered users with hashed passwords.
 * Roles: 'user' (default) | 'admin'
 *
 * Features:
 *  - Passwords are never stored in plain text (hashed with bcryptjs)
 *  - comparePassword() instance method for login validation
 *  - The password field is excluded from JSON output by default
 *  - Index on email for fast login lookups
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,          // Creates a unique index automatically
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,         // Exclude from query results by default
    },

    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: 'Role must be either "user" or "admin"',
      },
      default: 'user',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// ── Pre-save Hook: Hash password before saving ────────────────────────────────
// Only runs when the password field is modified (new user or password change)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// ── Instance Method: Compare plain text password with stored hash ─────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ── Hide sensitive fields when converting to JSON ─────────────────────────────
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// ── Index for faster lookups ──────────────────────────────────────────────────
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
