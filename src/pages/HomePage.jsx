// src/pages/HomePage.jsx
import { useProduct } from '../contexts/ProductContext';
import ProductList from '../components/ProductList';
import ImageCarousel from '../components/ImageCarousel';
import ProductHighlight from '../components/ProductHighlight';
import LatestProducts from '../components/LatestProducts';
import SEO from '../components/SEO';

export default function HomePage() {
  const { currentProduct, currentView } = useProduct();

  if (currentView !== 'home' && currentView !== 'product') {
    return null;
  }

  return (
    <>
      <SEO 
        title="Innovative India | Handcrafted Furniture & Home Decor"
        description="Discover our exquisite collection of handcrafted furniture. Each piece tells a story of tradition, craftsmanship, and innovation."
      />
      
      {!currentProduct ? (
        <main>
          <ImageCarousel />
          <ProductHighlight />
          <LatestProducts />
        </main>
      ) : (
        <ProductList 
          productType={currentProduct.type}
          productCategory={currentProduct.category}
          key={currentProduct.forceRefresh}
        />
      )}
    </>
  );
}