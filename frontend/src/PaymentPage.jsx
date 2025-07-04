import { useState } from 'react';
import StripePayment from './StripePayment';
import { useCart } from './CartContext';

export default function PaymentPage() {
  const [success, setSuccess] = useState(false);
  const { cart, clearCart } = useCart();

  // Calculate totals (copied from Checkout.jsx)
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + price * item.quantity;
  }, 0);
  const tax = +(subtotal * 0.08).toFixed(2); // 8% tax
  const shippingCost = subtotal > 0 ? 4.99 : 0;
  const total = (subtotal + tax + shippingCost).toFixed(2);
  // Stripe expects amount in paise/cents (no decimals)
  const amount = Math.round(Number(total) * 100);

  const handleSuccess = () => {
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{ padding: 40 }}>
        <h2 style={{ color: '#fff' }}>Thank you for your order!</h2>
        <button style={{ marginTop: 20 }} onClick={() => window.location.href = '/'}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ color: '#fff', marginBottom: 24 }}>Enter your payment details</h2>
      <StripePayment onSuccess={handleSuccess} amount={amount} displayTotal={total} />
    </div>
  );
} 