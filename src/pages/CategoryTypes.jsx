// src/pages/CategoryTypes.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../config/categories';
import { useProduct } from '../contexts/ProductContext';
import SEO from '../components/SEO';

const categoryImages = {
  tables: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
  chairs: "https://res.cloudinary.com/digi69oig/image/upload/v1729678755/coffee_table_b_1_vmw02x.jpg",
  decorative: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
  beds: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_2_xfyb9k.jpg"
};

export default function CategoryTypes() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { showProductList, resetToHome } = useProduct(); // Added resetToHome
  
  const category = categories[categoryName];
  
  if (!category) {
    resetToHome();
    return null;
  }

  const handleTypeClick = (type) => {
    showProductList(type, category.name, 'category-types');
    navigate('/');
  };

  // Handle back to home
  const handleBackToHome = () => {
    resetToHome();
    navigate('/', { replace: true }); // Added replace: true to clear history
  };

  return (
    <>
      <SEO 
        title={`${category.displayName} Types | Innovative India`}
        description={`Explore our collection of ${category.displayName.toLowerCase()}. Find the perfect piece for your space.`}
      />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <motion.button 
            onClick={handleBackToHome}  // Updated to use new handler
            className="flex items-center text-primary-600 hover:text-primary-800 transition-colors mb-8 group"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2 group-hover:animate-pulse" size={24} />
            <span className="font-medium">Back to Home</span>
          </motion.button>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-display text-primary-800 text-center mb-12"
          >
            {category.displayName} Types
          </motion.h1>

          {/* Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {category.items.map((type) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                onClick={() => handleTypeClick(type)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
              >
                <motion.div className="aspect-w-16 aspect-h-9">
                  <img
                    src={categoryImages[categoryName]}
                    alt={category.displayItems[type]}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
                <div className="p-4">
                  <h2 className="text-lg font-medium text-primary-800 text-center">
                    {category.displayItems[type]}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}