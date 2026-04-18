/**
 * routes/book.routes.js — Book Routing
 */

const express = require('express');
const bookController = require('../controllers/book.controller');
const validate = require('../middleware/validate');
const { bookSchemas } = require('../utils/validators');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);

// Protected routes (Admin only for creating/updating/deleting)
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', validate(bookSchemas.createBook), bookController.createBook);
router.patch('/:id', validate(bookSchemas.updateBook), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
