/**
 * routes/order.routes.js — Order Routing
 */

const express = require('express');
const orderController = require('../controllers/order.controller');
const validate = require('../middleware/validate');
const { orderSchemas } = require('../utils/validators');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/', validate(orderSchemas.createOrder), orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);
router.get('/:id', orderController.getOrder);

// Admin only routes
router.use(restrictTo('admin'));
router.get('/', orderController.getAllOrders);
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;
