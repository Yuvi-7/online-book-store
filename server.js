/**
 * server.js — Application Entry Point
 *
 * Responsibilities:
 *  - Load environment variables
 *  - Connect to MongoDB
 *  - Start the Express HTTP server
 */

const dotenv = require('dotenv');

// Load .env variables BEFORE importing anything that uses them
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB then start the server ──────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀  Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`📚  Online Bookstore API is ready at http://localhost:${PORT}/api`);
  });
});
