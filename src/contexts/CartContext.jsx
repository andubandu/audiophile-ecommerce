import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('audiophileCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('audiophileCart', JSON.stringify(cart));
  }, [cart]);

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  function addToCart(product, quantity) {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  }
  
  function updateQuantity(productId, quantity) {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }
  
  function removeFromCart(productId) {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }
  
  function clearCart() {
    setCart([]);
  }
  
  function toggleCart() {
    setIsCartOpen(prev => !prev);
  }
  
  const value = {
    cart,
    cartQuantity,
    cartTotal,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}