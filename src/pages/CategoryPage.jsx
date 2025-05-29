import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import CategorySection from '../components/common/CategorySection';
import { getProductsByCategory } from '../data/products';

const Hero = styled.section`
  background-color: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing-8) 0 var(--spacing-5);
  margin-bottom: var(--spacing-7);
  
  @media (max-width: 768px) {
    padding: var(--spacing-6) 0 var(--spacing-4);
    margin-bottom: var(--spacing-5);
  }
`;

const HeroTitle = styled.h2`
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  gap: var(--spacing-7);
  margin-bottom: var(--spacing-7);
  
  @media (max-width: 768px) {
    gap: var(--spacing-5);
    margin-bottom: var(--spacing-5);
  }
`;

const AboutSection = styled.section`
  margin: var(--spacing-7) 0;
  
  @media (max-width: 768px) {
    margin: var(--spacing-5) 0;
    text-align: center;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    grid-row: 2;
  }
`;

const AboutContent = styled.div`
  @media (max-width: 768px) {
    grid-row: 1;
    margin-bottom: var(--spacing-4);
  }
`;

const AboutTitle = styled.h2`
  margin-bottom: var(--spacing-4);
  
  span {
    color: var(--color-primary);
  }
`;

const AboutText = styled.p`
  margin-bottom: var(--spacing-3);
`;

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  
  useEffect(() => {
    const categoryProducts = getProductsByCategory(category);
    
    const sortedProducts = [...categoryProducts].sort((a, b) => {
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return 0;
    });
    
    setProducts(sortedProducts);
    
    setCategoryName(category.charAt(0).toUpperCase() + category.slice(1));
  }, [category]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <>
      <Hero>
        <div className="container">
          <HeroTitle>{categoryName}</HeroTitle>
        </div>
      </Hero>
      
      <div className="container">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ProductsGrid>
            {products.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard 
                  product={product} 
                  reversed={index % 2 !== 0}
                />
              </motion.div>
            ))}
          </ProductsGrid>
        </motion.div>
        
        <CategorySection />
        
        <AboutSection>
          <AboutGrid>
            <AboutContent>
              <AboutTitle>Bringing you the <span>best</span> audio gear</AboutTitle>
              <AboutText>
                Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
                earphones, speakers, and audio accessories. We have a large showroom and luxury 
                demonstration rooms available for you to browse and experience a wide range of our products. 
                Stop by our store to meet some of the fantastic people who make Audiophile the best place 
                to buy your portable audio equipment.
              </AboutText>
            </AboutContent>
            
            <AboutImage>
              <img 
                src="https://res.cloudinary.com/dyuabsnoo/image/upload/v1748540871/image-best-gear_nc35jg.jpg" 
                alt="Audiophile best audio gear" 
              />
            </AboutImage>
          </AboutGrid>
        </AboutSection>
      </div>
    </>
  );
}

export default CategoryPage;