import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartModal from '../cart/CartModal';
import MobileMenu from './MobileMenu';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--color-black);
  position: ${props => props.$isHome ? 'absolute' : 'relative'};
  width: 100%;
  z-index: 100;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const Logo = styled(Link)`
  z-index: 10;
  
  img {
    height: 25px;
  }
`;

const Navigation = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
`;

const NavItem = styled.li`
  a {
    color: var(--color-white);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  z-index: 10;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  margin-left: 1rem;
  
  &:hover svg path {
    fill: var(--color-primary);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 0.75rem;
  font-weight: 700;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-right: 1rem;
  }
  
  &:hover svg path {
    fill: var(--color-primary);
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, isCartOpen, cartQuantity } = useCart();
  const location = useLocation();
  
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <HeaderContainer $isHome={isHome}>
      <div className="container">
        <HeaderInner>
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h16v3H0zm0 6h16v3H0zm0 6h16v3H0z" fill="#FFF" fillRule="evenodd"/>
            </svg>
          </MenuButton>
          
          <Logo to="/">
            <img src="https://audiophile-ecommerce-mspayneii.netlify.app/src/assets/shared/desktop/logo.svg" alt="Audiophile Logo" />
          </Logo>
          
          <Navigation>
            <NavList>
              <NavItem>
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/category/headphones">Headphones</Link>
              </NavItem>
              <NavItem>
                <Link to="/category/speakers">Speakers</Link>
              </NavItem>
              <NavItem>
                <Link to="/category/earphones">Earphones</Link>
              </NavItem>
            </NavList>
          </Navigation>
          
          <HeaderActions>
            <CartButton onClick={toggleCart} aria-label="View Cart">
              <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#FFF" fillRule="nonzero"/>
              </svg>
              {cartQuantity > 0 && <CartCount>{cartQuantity}</CartCount>}
            </CartButton>
          </HeaderActions>
        </HeaderInner>
      </div>
      
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      {isCartOpen && <CartModal />}
    </HeaderContainer>
  );
}

export default Header;