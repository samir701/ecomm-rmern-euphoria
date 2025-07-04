import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Rh331RVgXW6OTvyyT0Ect5cugGhJ0cTyzWFIcVMLrqiYtjwu0imGQ3urYMiAe7GjoSsfJzwwQtin6q1SqShu2bk00MvC2LTyh'); // Replace with your Stripe publishable key

const paymentOptions = [
  { label: 'Card', value: 'card' },
  { label: 'UPI', value: 'upi' },
  { label: 'Wallet', value: 'wallet' },
];

function PaymentModal({ isOpen, onClose, onSuccess, amount, displayTotal }) {
  const [selected, setSelected] = useState('card');
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    if (selected === 'card') {
      if (!stripe || !elements) {
        setLoading(false);
        return;
      }
      try {
        // Call backend to create PaymentIntent
        const res = await fetch('/api/payment/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount || 1000, currency: 'INR' }),
        });
        const data = await res.json();
        if (!data.clientSecret) {
          setError(data.error || 'Failed to initiate payment');
          setLoading(false);
          return;
        }
        // Confirm card payment
        const cardElement = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
        if (result.error) {
          setError(result.error.message);
          setLoading(false);
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
          setSuccess(true);
          setLoading(false);
          if (onSuccess) onSuccess();
        } else {
          setError('Payment failed');
          setLoading(false);
        }
      } catch (err) {
        setError('Payment error: ' + err.message);
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        if (onSuccess) onSuccess();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 24, minWidth: 320, boxShadow: '0 2px 16px #0002', position: 'relative', color: '#111' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 12, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#111' }}>&times;</button>
        <h2 style={{ marginBottom: 8, color: '#111' }}>Payment Options</h2>
        {displayTotal && (
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#111', marginBottom: 12 }}>
            Total: ${displayTotal}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {paymentOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: selected === opt.value ? '2px solid #4f8cff' : '1px solid #ccc',
                background: selected === opt.value ? '#e6f0ff' : '#f9f9f9',
                cursor: 'pointer',
                fontWeight: selected === opt.value ? 'bold' : 'normal',
                color: '#111',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {selected === 'card' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, color: '#111' }}>Card Details</label>
              <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 8 }}>
                <CardElement options={{ style: { base: { fontSize: '16px', color: '#111' } } }} />
              </div>
            </div>
          )}
          {selected === 'upi' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, color: '#111' }}>UPI ID</label>
              <input type="text" placeholder="yourname@upi" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', color: '#fff', background: '#333', '::placeholder': { color: '#bbb' } }} required />
            </div>
          )}
          {selected === 'wallet' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4, color: '#111' }}>Select Wallet</label>
              <select style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', color: '#fff', background: '#333' }} required>
                <option value="">Choose Wallet</option>
                <option value="paytm">Paytm</option>
                <option value="phonepe">PhonePe</option>
                <option value="amazonpay">Amazon Pay</option>
              </select>
            </div>
          )}
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 8 }}>{'Payment Successful!'}</div>}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: 12, borderRadius: 8, background: '#4f8cff', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', marginTop: 8
          }}>
            {loading ? 'Processing...' : 'Proceed to Pay'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function StripePayment({ onSuccess, amount, displayTotal }) {
  const [open, setOpen] = useState(false);
  return (
    <Elements stripe={stripePromise}>
      <div>
        <button onClick={() => setOpen(true)} style={{ padding: '12px 24px', borderRadius: 8, background: '#4f8cff', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: 18, cursor: 'pointer' }}>
          Pay Now
        </button>
        <PaymentModal isOpen={open} onClose={() => setOpen(false)} onSuccess={onSuccess} amount={amount} displayTotal={displayTotal} />
      </div>
    </Elements>
  );
} 