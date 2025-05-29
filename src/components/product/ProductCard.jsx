import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  order: ${props => props.$reversed ? 2 : 1};
  
  img {
    width: 100%;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    order: 1;
  }
`;

const Content = styled.div`
  order: ${props => props.$reversed ? 1 : 2};
  
  @media (max-width: 768px) {
    order: 2;
  }
`;

const NewProduct = styled.p`
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 10px;
  font-size: var(--font-size-overline);
  margin-bottom: var(--spacing-2);
`;

const ProductName = styled.h2`
  margin-bottom: var(--spacing-3);
`;

const ProductDescription = styled.p`
  margin-bottom: var(--spacing-4);
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-sub-title);
  font-weight: 700;
  letter-spacing: 1px;
  padding: var(--spacing-2) var(--spacing-4);
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

function ProductCard({ product, reversed = false }) {
  return (
    <Card>
      <ImageContainer $reversed={reversed}>
        <img src={product.image} alt={product.name} />
      </ImageContainer>
      
      <Content $reversed={reversed}>
        {product.isNew && <NewProduct>New Product</NewProduct>}
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ViewButton to={`/product/${product.id}`}>See Product</ViewButton>
      </Content>
    </Card>
  );
}

export default ProductCard;