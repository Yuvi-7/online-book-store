/**
 * config/db.js — MongoDB Connection Manager
 *
 * Uses Mongoose to connect to MongoDB.
 * Exits the process on connection failure to prevent the server
 * from starting in a broken state.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are required in older Mongoose versions
      // Mongoose 7+ uses them by default, but kept for clarity
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
    console.log(`📂  Database: ${conn.connection.name}`);
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`);
    process.exit(1); // Crash fast — let a process manager restart the app
  }
};

module.exports = connectDB;
