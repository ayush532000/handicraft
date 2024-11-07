// src/components/ProductDetails.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import SEO from './SEO';

export default function ProductDetails({ product, onBack }) {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/products/${product.productId}/images`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch product images');
        }
        
        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [product.productId]);

  const goToNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="w-full h-[500px] bg-gray-100 animate-pulse rounded-lg"></div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-8 w-3/4 bg-gray-100 animate-pulse rounded mb-4"></div>
            <div className="h-6 w-1/4 bg-gray-100 animate-pulse rounded mb-4"></div>
            <div className="h-32 bg-gray-100 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-red-500 text-center">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${product.productName} | Innovative India`}
        description={product.productDescription}
        type="product"
        imageUrl={images[0]}
      />

      <div className="container mx-auto py-8 px-4">
        <motion.button 
          onClick={onBack}
          className="flex items-center text-primary-600 hover:text-primary-800 transition-colors mb-6 group"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="mr-2 group-hover:animate-pulse" size={24} />
          <span>Back to Products</span>
        </motion.button>

        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6">
          {/* Left side - Images */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  alt={`${product.productName} - View ${currentImageIndex + 1}`}
                  className="w-full h-[500px] object-contain bg-gray-50 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                {currentImageIndex > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToPreviousImage}
                    className="ml-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-primary-800" />
                  </motion.button>
                )}
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center">
                {currentImageIndex < images.length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToNextImage}
                    className="mr-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-primary-800" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 ${
                    currentImageIndex === index 
                      ? 'ring-2 ring-primary-600' 
                      : 'hover:ring-2 hover:ring-primary-400'
                  } rounded-md overflow-hidden transition-all duration-200`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={image} 
                    alt={`${product.productName} thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                  {currentImageIndex === index && (
                    <motion.div 
                      className="absolute inset-0 bg-primary-600/10"
                      layoutId="selectedThumbnail"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display text-primary-800 border-b border-primary-100 pb-4">
                {product.productName}
              </h2>

              <div className="inline-block px-3 py-1 bg-primary-50 text-primary-800 rounded-full text-sm font-medium">
                Product Code: {product.productId}
              </div>

              <div className="prose prose-primary max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product.productDescription}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};