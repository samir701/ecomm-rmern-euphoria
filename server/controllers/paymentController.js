const { Cashfree } = require('cashfree-pg');
const Stripe = require('stripe');

const cashfree = new Cashfree({
  env: process.env.CASHFREE_ENV || 'TEST',
  appId: process.env.CASHFREE_APP_ID,
  secretKey: process.env.CASHFREE_SECRET_KEY,
});

const stripe = Stripe('sk_test_51Rh331RVgXW6OTvyqdrEZsCA8870G2cSteK3ajsH3bz3q5jDz7URk5ZhaGgyPbHfpC8nVn1cWvxwm0KV4Rxj9glF00D1SwKRoo'); // Replace with your real secret key

exports.createCashfreeOrder = async (req, res) => {
  const { amount, currency, customer_id, customer_email, customer_phone } = req.body;
  try {
    const orderPayload = {
      order_id: 'order_' + Date.now(),
      order_amount: amount,
      order_currency: currency || 'INR',
      customer_details: {
        customer_id: customer_id || 'user_123',
        customer_email: customer_email || 'test@example.com',
        customer_phone: customer_phone || '9999999999',
      },
    };
    const result = await cashfree.PGCreateOrder(orderPayload);
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in the smallest currency unit (e.g., paise for INR)
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 