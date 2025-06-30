import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return sum + price * item.quantity;
    }, 0).toFixed(2);
  };

  const getItemSubtotal = (item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return (price * item.quantity).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="app-container">
        <div className="product-detail-container" style={{ color: '#222' }}>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div style={{ textAlign: 'center', padding: '50px', color: '#222' }}>
            <h2>Your Cart is Empty</h2>
            <button className="add-to-cart-btn" onClick={() => navigate('/')}>Shop Now</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="product-detail-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 style={{ marginBottom: 24 }}>Your Cart</h2>
        <div className="cart-list">
          {cart.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-title">{item.title || item.name}</div>
                <div>Size: <b>{item.size}</b></div>
                <div>Quantity: <b>{item.quantity}</b></div>
                <div>Price per item: <b>{item.price}</b></div>
                <div>Subtotal: <b>${getItemSubtotal(item)}</b></div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(idx)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total-section">
          <div className="cart-total-label">Total:</div>
          <div className="cart-total-value">${getTotal()}</div>
        </div>
        <button className="buy-now-btn" style={{ marginTop: 24 }} onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  );
} 