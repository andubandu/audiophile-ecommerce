import styled from 'styled-components';
import CategoryCard from './CategoryCard';

const Section = styled.section`
  margin: var(--spacing-6) 0;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-3);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
`;

function CategorySection() {
  const categories = [
    { 
      id: 'headphones', 
      name: 'Headphones', 
      image: 'https://github.com/MSPayneII/Audiophile_e-commerce/blob/main/src/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg?raw=true',
      path: '/category/headphones'
    },
    { 
      id: 'speakers', 
      name: 'Speakers', 
      image: 'https://audiophile-ecommerce-mspayneii.netlify.app/src/assets/shared/desktop/image-category-thumbnail-speakers.png',
      path: '/category/speakers'
    },
    { 
      id: 'earphones', 
      name: 'Earphones', 
      image: 'https://audiophile-ecommerce-mspayneii.netlify.app/src/assets/shared/desktop/image-category-thumbnail-earphones.png',
      path: '/category/earphones'
    }
  ];

  return (
    <Section>
      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </CategoriesGrid>
    </Section>
  );
}

export default CategorySection;