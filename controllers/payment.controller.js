/**
 * controllers/payment.controller.js — Payment Logic
 * 
 * Mock payment integration as requested.
 */

const Order = require('../models/Order');
const AppError = require('../utils/AppError');

exports.processPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod } = req.body;

    if (!orderId || !paymentMethod) {
      return next(new AppError('Please provide orderId and paymentMethod', 400));
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    if (order.user.toString() !== req.user.id) {
      return next(new AppError('Not authorized to pay for this order', 403));
    }

    if (order.paymentStatus === 'paid') {
      return next(new AppError('Order is already paid', 400));
    }

    // --- MOCK PAYMENT GATEWAY LOGIC ---
    // Simulate a payment processing delay
    // In reality, you would use Stripe, PayPal, Razorpay etc SDKs here.
    
    // Generate a fake payment ID
    const mockPaymentId = `pay_${Math.random().toString(36).substring(2, 15)}`;
    
    // Simulate 90% success rate
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      order.paymentStatus = 'paid';
      order.paymentId = mockPaymentId;
      order.status = 'processing'; // Update order status automatically
      await order.save();

      res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        data: {
          order
        }
      });
    } else {
      order.paymentStatus = 'failed';
      await order.save();

      return next(new AppError('Payment failed. Please try again.', 400));
    }

  } catch (err) {
    next(err);
  }
};
