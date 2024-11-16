// src/components/ProductDetails.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { useProduct } from '../contexts/ProductContext';
import SEO from './SEO';

export default function ProductDetails({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { resetToHome, currentView, setCurrentProduct, setView } = useProduct();

  // Auto switch images every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [product.images.length, isAutoPlaying]);

  const goToNextImage = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  }, [product.images.length]);

  const goToPreviousImage = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  }, [product.images.length]);

  // Function to handle back navigation
  const handleBack = () => {
    if (currentView === 'product-details') {
      resetToHome();
    } else {
      const productListData = {
        type: product.type,
        category: product.category,
        forceRefresh: Date.now()
      };
      setCurrentProduct(productListData);
      setView('product');
    }
  };

  // Combine all description fields
  const getDescription = () => {
    return [
      product.introduction,
      product.materialDetails,
      product.craftsmanship,
      product.designAndStyle,
      product.functionalityAndUse,
      product.callToAction
    ]
    .filter(Boolean)
    .join('\n\n');
  };

  return (
    <>
      <SEO 
        title={`${product.title} | Innovative India`}
        description={getDescription().slice(0, 160) + '...'}
        type="product"
        imageUrl={product.images[0]}
      />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <motion.button 
            onClick={handleBack}
            className="flex items-center text-primary-600 hover:text-primary-800 transition-colors mb-8 group"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2 group-hover:animate-pulse" size={24} />
            <span className="font-medium">
              {currentView === 'product-details' ? 'Back to Home' : 'Back to Products'}
            </span>
          </motion.button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Images */}
              <div className="w-full lg:w-1/2 p-6">
                <div className="relative rounded-lg overflow-hidden bg-gray-50">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentImageIndex}
                      src={product.images[currentImageIndex]} 
                      alt={`${product.title} - View ${currentImageIndex + 1}`}
                      className="w-full h-[500px] object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      {currentImageIndex > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={goToPreviousImage}
                          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={24} className="text-primary-800" />
                        </motion.button>
                      )}
                      
                      {currentImageIndex < product.images.length - 1 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={goToNextImage}
                          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200"
                          aria-label="Next image"
                        >
                          <ChevronRight size={24} className="text-primary-800" />
                        </motion.button>
                      )}
                    </div>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="mt-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {product.images.map((image, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setIsAutoPlaying(false);
                          }}
                          className={`relative flex-shrink-0 ${
                            currentImageIndex === index 
                              ? 'ring-2 ring-primary-600' 
                              : 'hover:ring-2 hover:ring-primary-400'
                          } rounded-md overflow-hidden transition-all duration-200`}
                        >
                          <img 
                            src={image} 
                            alt={`${product.title} thumbnail ${index + 1}`}
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
                )}
              </div>

              {/* Right Side - Details */}
              <div className="w-full lg:w-1/2 p-6 lg:p-8 bg-gray-50 lg:bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl md:text-4xl font-display text-primary-800">
                    {product.title}
                  </h1>
                  
                  <p className="text-lg text-primary-600 font-medium">
                    {product.productCode}
                  </p>

                  {getDescription() && (
                    <div className="prose prose-lg prose-primary max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {getDescription()}
                      </p>
                    </div>
                  )}

                  {product.dimensions && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-800">
                        <span className="font-medium">Dimensions:</span>{' '}
                        {product.dimensions}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    introduction: PropTypes.string,
    materialDetails: PropTypes.string,
    craftsmanship: PropTypes.string,
    designAndStyle: PropTypes.string,
    functionalityAndUse: PropTypes.string,
    callToAction: PropTypes.string,
    dimensions: PropTypes.string,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
};