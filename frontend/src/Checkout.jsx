import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);

  // Shipping form state
  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [billingSame, setBillingSame] = useState(true);
  const [billing, setBilling] = useState({ ...shipping });
  const [submitted, setSubmitted] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + price * item.quantity;
  }, 0);
  const tax = +(subtotal * 0.08).toFixed(2); // 8% tax
  const shippingCost = subtotal > 0 ? 4.99 : 0;
  const total = (subtotal + tax + shippingCost).toFixed(2);

  // Handle form changes
  const handleShippingChange = e => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
    if (billingSame) setBilling({ ...shipping, [e.target.name]: e.target.value });
  };
  const handleBillingChange = e => setBilling({ ...billing, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (success) {
    return (
      <div style={{ padding: 40 }}>
        <h2 style={{ color: '#333' }}>Thank you for your order!</h2>
        <button style={{ marginTop: 20, padding: '16px 40px', fontSize: 24, fontWeight: 'bold', background: '#e74c5b', color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="product-detail-container">
        <h2 style={{ marginBottom: 24, color: '#222' }}>Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-sections">
            {/* Shipping Info */}
            <div className="checkout-section">
              <h3>Shipping Information</h3>
              <input name="name" placeholder="Full Name" value={shipping.name} onChange={handleShippingChange} required />
              <input name="address" placeholder="Address" value={shipping.address} onChange={handleShippingChange} required />
              <input name="city" placeholder="City" value={shipping.city} onChange={handleShippingChange} required />
              <input name="state" placeholder="State" value={shipping.state} onChange={handleShippingChange} required />
              <input name="zip" placeholder="ZIP Code" value={shipping.zip} onChange={handleShippingChange} required />
              <input name="country" placeholder="Country" value={shipping.country} onChange={handleShippingChange} required />
            </div>
            {/* Billing Info */}
            <div className="checkout-section">
              <h3>Billing Information</h3>
              <label style={{ marginBottom: 8 }}>
                <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} /> Same as shipping
              </label>
              {!billingSame && (
                <>
                  <input name="name" placeholder="Full Name" value={billing.name} onChange={handleBillingChange} required />
                  <input name="address" placeholder="Address" value={billing.address} onChange={handleBillingChange} required />
                  <input name="city" placeholder="City" value={billing.city} onChange={handleBillingChange} required />
                  <input name="state" placeholder="State" value={billing.state} onChange={handleBillingChange} required />
                  <input name="zip" placeholder="ZIP Code" value={billing.zip} onChange={handleBillingChange} required />
                  <input name="country" placeholder="Country" value={billing.country} onChange={handleBillingChange} required />
                </>
              )}
            </div>
            {/* Order Summary */}
            <div className="checkout-section order-summary-section">
              <h3>Order Summary</h3>
              <div className="order-summary-list">
                {cart.map((item, idx) => (
                  <div className="order-summary-item" key={idx}>
                    <span>{item.title || item.name} (x{item.quantity}, {item.size})</span>
                    <span>${(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-summary-totals">
                <div><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                <div><span>Tax (8%):</span><span>${tax.toFixed(2)}</span></div>
                <div><span>Shipping:</span><span>${shippingCost.toFixed(2)}</span></div>
                <div className="order-summary-total"><span>Total:</span><span>${total}</span></div>
              </div>
            </div>
          </div>
          <button className="buy-now-btn" type="button" style={{ marginTop: 32, width: '100%' }} onClick={() => navigate('/payment')}>Pay Now</button>
        </form>
      </div>
    </div>
  );
} 