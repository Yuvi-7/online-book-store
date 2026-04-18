/**
 * routes/auth.routes.js — Auth Routing
 */

const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { authSchemas } = require('../utils/validators');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', validate(authSchemas.register), authController.register);
router.post('/login', validate(authSchemas.login), authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;
