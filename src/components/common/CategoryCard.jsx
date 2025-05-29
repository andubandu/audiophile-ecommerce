import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--color-light-gray);
  border-radius: 8px;
  padding: var(--spacing-2) var(--spacing-1) var(--spacing-3);
  text-align: center;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    .shop-link {
      color: var(--color-primary);
    }
  }
`;

const ImageContainer = styled.div`
  margin-bottom: var(--spacing-1);
  height: 120px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-height: 100%;
    margin-top: -40px;
  }
`;

const CategoryName = styled.h6`
  margin-bottom: var(--spacing-1);
`;

const ShopLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  
  svg {
    margin-left: 0.5rem;
  }
`;

function CategoryCard({ category, onClick }) {
  return (
    <Link to={category.path} onClick={onClick}>
      <Card>
        <ImageContainer>
          <img src={category.image} alt={category.name} />
        </ImageContainer>
        <CategoryName>{category.name}</CategoryName>
        <ShopLink className="shop-link">
          Shop
          <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/>
          </svg>
        </ShopLink>
      </Card>
    </Link>
  );
}

export default CategoryCard;