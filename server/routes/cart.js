const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

// Get current user's cart
router.get('/', auth, cartController.getCart);

// Save/update current user's cart
router.post('/', auth, cartController.saveCart);

module.exports = router; 