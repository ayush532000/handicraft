// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API_URL } from '../config/api';
import ProductDetails from './ProductDetails';
import { useProduct } from '../contexts/ProductContext';
import SEO from './SEO';
import { categories } from '../config/categories';

export default function ProductList({ productType, productCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { navigationSource } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/products?category=${productCategory}&type=${productType}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productType && productCategory) {
      fetchProducts();
    }
  }, [productType, productCategory]);

  // Helper function to get category details
  const getCategoryFromName = (categoryName) => {
    return Object.values(categories).find(cat => cat.name === categoryName);
  };

  // Helper function to get display name for type
  const getTypeDisplayName = (type) => {
    const category = getCategoryFromName(productCategory);
    return category ? category.displayItems[type] : type;
  };

  if (selectedProduct) {
    return <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  const displayTitle = getTypeDisplayName(productType);

  return (
    <>
      <SEO 
        title={`${displayTitle} Collection | Innovative India`}
        description={`Browse our collection of handcrafted ${displayTitle.toLowerCase()}. Each piece is uniquely crafted with traditional techniques.`}
      />

      <div className="container mx-auto py-8 px-4">
        {/* Show back button only if user came from category types */}
        {navigationSource === 'category-types' && (
          <motion.button 
            onClick={() => {
              const category = getCategoryFromName(productCategory);
              const categoryKey = Object.keys(categories).find(key => 
                categories[key].name === category.name
              );
              navigate(`/category/${categoryKey}`);
            }}
            className="flex items-center text-primary-600 hover:text-primary-800 transition-colors mb-8 group"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2 group-hover:animate-pulse" size={24} />
            <span className="font-medium">Back to {getCategoryFromName(productCategory)?.displayName} Types</span>
          </motion.button>
        )}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display text-primary-800 text-center mb-12"
        >
          {displayTitle}
        </motion.h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : !products.length ? (
          <div className="text-center text-gray-500 py-8">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                layoutId={`product-${product._id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-medium text-primary-800 text-center">
                    {product.title}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

ProductList.propTypes = {
  productType: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
};