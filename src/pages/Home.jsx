import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CategorySection from '../components/common/CategorySection';
import { getFeaturedProducts } from '../data/products';

const HeroSection = styled.section`
  background-color: var(--color-black);
  background-image: url('https://res.cloudinary.com/dyuabsnoo/image/upload/v1748540650/image-hero_smdjxb.jpg');
  background-size: cover;
  background-position: center;
  color: var(--color-white);
  padding: var(--spacing-7) 0;
  margin-bottom: var(--spacing-7);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-5) 0;
    margin-bottom: var(--spacing-5);
  }
`;

const HeroContent = styled.div`
  max-width: 396px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto;
  }
`;

const HeroOverline = styled.p`
  color: var(--color-white);
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin-bottom: var(--spacing-3);
`;

const HeroTitle = styled.h1`
  margin-bottom: var(--spacing-3);
`;

const HeroText = styled.p`
  color: var(--color-white);
  opacity: 0.75;
  margin-bottom: var(--spacing-4);
`;

const HeroButton = styled(Link)`
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

const FeaturedSection = styled.section`
  margin: var(--spacing-7) 0;
  
  @media (max-width: 768px) {
    margin: var(--spacing-5) 0;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  gap: var(--spacing-4);
`;

const FeaturedPrimary = styled.div`
  background-color: var(--color-primary);
  border-radius: 8px;
  padding: var(--spacing-5);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
    text-align: center;
  }
`;

const FeaturedPrimaryContent = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeaturedImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 400px;
  }
`;

const FeaturedInfo = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-4);
  }
`;

const FeaturedTitle = styled.h2`
  margin-bottom: var(--spacing-3);
`;

const FeaturedText = styled.p`
  color: var(--color-white);
  opacity: 0.75;
  margin-bottom: var(--spacing-4);
  max-width: 349px;
  
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const FeaturedButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-black);
  color: var(--color-white);
  font-size: var(--font-size-sub-title);
  font-weight: 700;
  letter-spacing: 1px;
  padding: var(--spacing-2) var(--spacing-4);
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-light-black);
  }
`;

const FeaturedSecondary = styled.div`
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  padding: var(--spacing-5);
  position: relative;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
`;

const FeaturedSecondaryContent = styled.div`
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const FeaturedTertiary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImage3 = styled.div`
  height: 100%;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const FeaturedContent3 = styled.div`
  background-color: var(--color-light-gray);
  border-radius: 8px;
  padding: var(--spacing-5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
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

function Home() {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent>
              <HeroOverline>New product</HeroOverline>
              <HeroTitle>XX99 Mark II Headphones</HeroTitle>
              <HeroText>
                Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
              </HeroText>
              <HeroButton to="/product/xx99-mark-two-headphones">See Product</HeroButton>
            </HeroContent>
          </motion.div>
        </div>
      </HeroSection>
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CategorySection />
        </motion.div>
        
        <FeaturedSection>
          <FeaturedGrid>
            <FeaturedPrimary>
              <FeaturedPrimaryContent>
                <FeaturedImage>
                  <img src={featuredProducts[0].image} alt={featuredProducts[0].name} />
                </FeaturedImage>
                
                <FeaturedInfo>
                  <FeaturedTitle>{featuredProducts[0].name}</FeaturedTitle>
                  <FeaturedText>
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                  </FeaturedText>
                  <FeaturedButton to={`/product/${featuredProducts[0].id}`}>See Product</FeaturedButton>
                </FeaturedInfo>
              </FeaturedPrimaryContent>
            </FeaturedPrimary>
            
            <FeaturedSecondary $backgroundImage={featuredProducts[1].image}>
              <FeaturedSecondaryContent>
                <FeaturedTitle>{featuredProducts[1].name}</FeaturedTitle>
                <FeaturedButton to={`/product/${featuredProducts[1].id}`}>See Product</FeaturedButton>
              </FeaturedSecondaryContent>
            </FeaturedSecondary>
            
            <FeaturedTertiary>
              <FeaturedImage3 $backgroundImage={featuredProducts[2].image} />
              <FeaturedContent3>
                <FeaturedTitle>{featuredProducts[2].name}</FeaturedTitle>
                <FeaturedButton to={`/product/${featuredProducts[2].id}`}>See Product</FeaturedButton>
              </FeaturedContent3>
            </FeaturedTertiary>
          </FeaturedGrid>
        </FeaturedSection>
        
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

export default Home;