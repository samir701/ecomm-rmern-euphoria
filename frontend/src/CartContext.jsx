import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

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

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
} 