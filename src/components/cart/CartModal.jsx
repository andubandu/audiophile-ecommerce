import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 90;
`;

const CartContainer = styled(motion.div)`
  background-color: var(--color-white);
  padding: var(--spacing-4);
  border-radius: 8px;
  position: fixed;
  top: 120px;
  right: 0;
  width: 100%;
  max-width: 377px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  z-index: 100;
  margin-right: var(--spacing-3);
  
  @media (max-width: 480px) {
    max-width: calc(100% - var(--spacing-4));
    margin-right: var(--spacing-2);
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-3);
`;

const CartTitle = styled.h6``;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-body);
  color: rgba(0, 0, 0, 0.5);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const CartItems = styled.ul`
  margin-bottom: var(--spacing-3);
`;

const CartFooter = styled.div``;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-3);
  
  h6 {
    color: rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
  }
  
  span {
    font-size: var(--font-size-h6);
    font-weight: 700;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  background-color: var(--color-primary);
  color: var(--color-white);
  text-align: center;
  padding: var(--spacing-2);
  font-weight: 700;
  font-size: var(--font-size-sub-title);
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const EmptyCart = styled.p`
  text-align: center;
  padding: var(--spacing-3);
  color: rgba(0, 0, 0, 0.5);
`;

function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

function CartModal() {
  const { cart, cartTotal, toggleCart, clearCart } = useCart();
  const cartRef = useRef();
  
  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        toggleCart();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleCart]);
  
  return (
    <AnimatePresence>
      <Overlay 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleCart}
      />
      <CartContainer 
        ref={cartRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CartHeader>
          <CartTitle>{`CART (${cart.length})`}</CartTitle>
          {cart.length > 0 && (
            <RemoveButton onClick={clearCart}>Remove all</RemoveButton>
          )}
        </CartHeader>
        
        {cart.length > 0 ? (
          <>
            <CartItems>
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </CartItems>
            
            <CartFooter>
              <CartTotal>
                <h6>Total</h6>
                <span>{formatPrice(cartTotal)}</span>
              </CartTotal>
              
              <CheckoutButton to="/checkout" onClick={toggleCart}>
                Checkout
              </CheckoutButton>
            </CartFooter>
          </>
        ) : (
          <EmptyCart>Your cart is empty</EmptyCart>
        )}
      </CartContainer>
    </AnimatePresence>
  );
}

export default CartModal;