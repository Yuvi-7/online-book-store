/**
 * routes/cart.routes.js — Cart Routing
 */

const express = require('express');
const cartController = require('../controllers/cart.controller');
const validate = require('../middleware/validate');
const { cartSchemas } = require('../utils/validators');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.get('/', cartController.getCart);
router.post('/add', validate(cartSchemas.addToCart), cartController.addToCart);
router.patch('/item/:itemId', validate(cartSchemas.updateQuantity), cartController.updateCartItemQuantity);
router.delete('/item/:itemId', cartController.removeFromCart);

module.exports = router;
