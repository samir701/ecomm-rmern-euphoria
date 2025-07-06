const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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