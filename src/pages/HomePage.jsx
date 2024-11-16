// src/pages/HomePage.jsx
import { useProduct } from '../contexts/ProductContext';
import ProductList from '../components/ProductList';
import ProductDetails from '../components/ProductDetails';
import ImageCarousel from '../components/ImageCarousel';
import ProductHighlight from '../components/ProductHighlight';
import LatestProducts from '../components/LatestProducts';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const heroImages = [
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_b_2_qqe2gb.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_1_veyjzs.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_4_bkekyg.jpg"
];

const highlights = [
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
    name: "Table",
    description: "Experience the perfect blend of form and function with our handcrafted tables. Each piece is meticulously crafted to become the centerpiece of your living space, combining traditional artisanship with contemporary design.",
    alignment: "left"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678755/coffee_table_b_1_vmw02x.jpg",
    name: "Chair",
    description: "Discover comfort redefined with our signature chair collection. Expertly crafted using time-honored techniques, our chairs offer the perfect balance of elegance and durability for your home.",
    alignment: "right"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
    name: "Decorative Furniture",
    description: "Transform your space with our exquisite decorative furniture collection. From intricately carved mirror frames to stunning display cabinets, each piece is a masterwork of artistic expression that adds character and sophistication to any room.",
    alignment: "left"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_2_xfyb9k.jpg",
    name: "Beds",
    description: "Indulge in the luxury of our handcrafted bed collection. Combining traditional Indian craftsmanship with modern comfort, our beds are designed to create a serene sanctuary for your perfect night's sleep.",
    alignment: "right"
  }
];

export default function HomePage() {
  const { currentProduct, currentView } = useProduct();

  if (currentView !== 'home' && currentView !== 'product' && currentView !== 'product-details') {
    return null;
  }

  if (currentView === 'product-details' && currentProduct) {
    return <ProductDetails product={currentProduct} />;
  }

  if (currentView === 'product' && currentProduct) {
    return (
      <ProductList 
        productType={currentProduct.type}
        productCategory={currentProduct.category}
        key={currentProduct.forceRefresh}
      />
    );
  }

  return (
    <>
      <SEO 
        title="Innovative India | Handcrafted Furniture & Home Decor"
        description="Discover our exquisite collection of handcrafted furniture. Each piece tells a story of tradition, craftsmanship, and innovation."
        imageUrl={heroImages[0]}
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Carousel Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ImageCarousel images={heroImages} />
        </motion.section>

        {/* Product Highlights Section */}
        <section className="py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <ProductHighlight highlights={highlights} />
          </motion.div>
        </section>

        {/* Latest Products Section */}
        <section className="py-16 px-4 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <div className="max-w-7xl mx-auto">
              <LatestProducts />
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}