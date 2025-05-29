import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CategoryCard from '../common/CategoryCard';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 90;
  overflow: auto;
`;

const MenuContainer = styled(motion.div)`
  background-color: var(--color-white);
  padding: var(--spacing-4) var(--spacing-3);
  border-radius: 0 0 8px 8px;
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-2);
  margin-top: var(--spacing-4);
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
`;

function MobileMenu({ onClose }) {
  const categories = [
    { 
      id: 'headphones', 
      name: 'Headphones', 
      image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=300',
      path: '/category/headphones'
    },
    { 
      id: 'speakers', 
      name: 'Speakers', 
      image: 'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=300',
      path: '/category/speakers'
    },
    { 
      id: 'earphones', 
      name: 'Earphones', 
      image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=300',
      path: '/category/earphones'
    }
  ];

  return (
    <>
      <Overlay 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <MenuContainer
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CategoriesGrid>
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              category={category}
              onClick={onClose}
            />
          ))}
        </CategoriesGrid>
      </MenuContainer>
    </>
  );
}

export default MobileMenu;