/**
 * routes/payment.routes.js — Payment Routing
 */

const express = require('express');
const paymentController = require('../controllers/payment.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/process', paymentController.processPayment);

module.exports = router;
