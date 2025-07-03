import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Function to set cart from backend
  const setCartFromBackend = (items) => {
    setCart(items || []);
  };

  const addToCart = (product, size, quantity) => {
    // Check if item with same id and size exists
    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.size === size
    );
    if (existingIndex !== -1) {
      // Update quantity
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          size,
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart => cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCartFromBackend }}>
      <CartSync cart={cart} />
      {children}
    </CartContext.Provider>
  );
}

// CartSync component for backend sync
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
function CartSync({ cart }) {
  const { token } = useAuth();
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (token) {
      fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });
    }
  }, [cart, token]);
  return null;
} 