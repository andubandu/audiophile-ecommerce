import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import CategorySection from '../components/common/CategorySection';
import { getProductById, getRelatedProducts } from '../data/products';

const ProductSection = styled.section`
  margin: var(--spacing-6) 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 0.9375rem;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  margin-bottom: var(--spacing-4);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const ProductOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-5);
  margin-bottom: var(--spacing-7);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-5);
  }
`;

const ProductImage = styled.div`
  background-color: var(--color-light-gray);
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const ProductPrice = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: var(--spacing-3);
`;

const AddToCartSection = styled.div`
  display: flex;
  gap: var(--spacing-2);
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-light-gray);
  padding: 0 var(--spacing-2);
  width: 120px;
  height: 48px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-size: 1.125rem;
  width: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const QuantityValue = styled.span`
  flex: 1;
  text-align: center;
  font-weight: 700;
  font-size: 0.8125rem;
`;

const AddToCartButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0 var(--spacing-4);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-5);
  margin-bottom: var(--spacing-7);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-5);
  }
`;

const FeaturesList = styled.div`
  h3 {
    margin-bottom: var(--spacing-3);
  }
  
  p {
    white-space: pre-line;
  }
`;

const InTheBoxList = styled.div`
  h3 {
    margin-bottom: var(--spacing-3);
  }
  
  ul {
    list-style: none;
  }
  
  li {
    margin-bottom: var(--spacing-1);
    display: flex;
    align-items: center;
    
    span:first-child {
      color: var(--color-primary);
      font-weight: 700;
      margin-right: var(--spacing-2);
      min-width: 20px;
    }
    
    span:last-child {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-7);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-bottom: var(--spacing-5);
  }
`;

const GallerySide = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GalleryImage = styled.div`
  background-color: var(--color-light-gray);
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RelatedProducts = styled.section`
  margin-bottom: var(--spacing-7);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-5);
  }
`;

const RelatedTitle = styled.h3`
  text-align: center;
  margin-bottom: var(--spacing-5);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-4);
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-3);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
`;

const RelatedItem = styled.div`
  text-align: center;
`;

const RelatedItemImage = styled.div`
  background-color: var(--color-light-gray);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: var(--spacing-3);
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const RelatedItemName = styled.h5`
  margin-bottom: var(--spacing-3);
`;

const RelatedItemButton = styled(Link)`
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

function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchedProduct = getProductById(productId);
    
    if (!fetchedProduct) {
      navigate('/');
      return;
    }
    
    setProduct(fetchedProduct);
    setRelatedProducts(getRelatedProducts(productId));
    setQuantity(1);
  }, [productId, navigate]);
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!product) {
    return null;
  }
  
  return (
    <div className="container">
      <ProductSection>
        <BackButton onClick={handleGoBack}>Go Back</BackButton>
        
        <ProductOverview>
          <ProductImage>
            <img src={product.image} alt={product.name} />
          </ProductImage>
          
          <ProductDetails>
            {product.isNew && <NewProduct>New Product</NewProduct>}
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>{formatPrice(product.price)}</ProductPrice>
            
            <AddToCartSection>
              <QuantityControl>
                <QuantityButton onClick={handleDecreaseQuantity}>-</QuantityButton>
                <QuantityValue>{quantity}</QuantityValue>
                <QuantityButton onClick={handleIncreaseQuantity}>+</QuantityButton>
              </QuantityControl>
              
              <AddToCartButton onClick={handleAddToCart}>Add to cart</AddToCartButton>
            </AddToCartSection>
          </ProductDetails>
        </ProductOverview>
        
        <ProductInfo>
          <FeaturesList>
            <h3>Features</h3>
            <p>{product.features}</p>
          </FeaturesList>
          
          <InTheBoxList>
            <h3>In The Box</h3>
            <ul>
              {product.inTheBox.map((item, index) => (
                <li key={index}>
                  <span>{item.quantity}x</span>
                  <span>{item.item}</span>
                </li>
              ))}
            </ul>
          </InTheBoxList>
        </ProductInfo>
        
        <Gallery>
          <GallerySide>
            <GalleryImage>
              <img src={product.gallery[1]} alt={`${product.name} gallery`} />
            </GalleryImage>
            <GalleryImage>
              <img src={product.gallery[2]} alt={`${product.name} gallery`} />
            </GalleryImage>
          </GallerySide>
          
          <GalleryImage>
            <img src={product.gallery[0]} alt={`${product.name} showcase`} />
          </GalleryImage>
        </Gallery>
        
        <RelatedProducts>
          <RelatedTitle>You May Also Like</RelatedTitle>
          
          <RelatedGrid>
            {relatedProducts.map(relatedProduct => (
              <RelatedItem key={relatedProduct.id}>
                <RelatedItemImage>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </RelatedItemImage>
                <RelatedItemName>{relatedProduct.name}</RelatedItemName>
                <RelatedItemButton to={`/product/${relatedProduct.id}`}>
                  See Product
                </RelatedItemButton>
              </RelatedItem>
            ))}
          </RelatedGrid>
        </RelatedProducts>
        
        <CategorySection />
      </ProductSection>
    </div>
  );
}

export default ProductPage;