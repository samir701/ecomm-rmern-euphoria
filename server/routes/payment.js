const express = require('express');
const router = express.Router();
const { createCashfreeOrder, createPaymentIntent } = require('../controllers/paymentController');

router.post('/create-cashfree-order', createCashfreeOrder);
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router; 