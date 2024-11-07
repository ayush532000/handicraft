// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ProductDetails from './ProductDetails';
import SEO from './SEO';

export default function ProductList({ productType, productCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setSelectedProduct(null);
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/products?productType=${productType}&productCategory=${productCategory}`
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

  if (selectedProduct) {
    return (
      <ProductDetails 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center p-8 text-primary-600">
        <p className="text-lg">No products found</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${productType} Collection | Handicraft Store`}
        description={`Browse our collection of handcrafted ${productType.toLowerCase()}s. Each piece is uniquely crafted with traditional techniques.`}
      />
      
      <div className="container mx-auto py-8 relative z-0">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display text-primary-800 text-center mb-8"
        >
          {productType} Collection
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {products.map((product) => (
            <motion.div 
              key={product.productId}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={product.productImage} 
                  alt={product.productName}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium text-primary-800">
                  {product.productName}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

ProductList.propTypes = {
  productType: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
};