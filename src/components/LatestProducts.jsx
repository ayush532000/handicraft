// src/components/LatestProducts.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';
import { useProduct } from '../contexts/ProductContext';

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showProductDetails } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Initialize activeIndices based on number of products, up to 4 at a time
      const initialIndices = Array.from(
        { length: Math.min(4, products.length) },
        (_, i) => i
      );
      setActiveIndices(initialIndices);
    }
  }, [products]);

  useEffect(() => {
    if (dragging) return;

    const timer = setInterval(() => {
      setActiveIndices(current => {
        const maxIndex = products.length - 1;
        const newIndices = current.map(index => 
          index === maxIndex ? 0 : index + 1
        );
        return newIndices;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [dragging, products.length]);

  const fetchLatestProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/latest-products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch latest products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching latest products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      setActiveIndices(current => {
        return current.map(index => {
          const newIndex = index + direction;
          if (newIndex < 0) return products.length - 1;
          if (newIndex >= products.length) return 0;
          return newIndex;
        });
      });
    }
  };

  const handleProductClick = (product) => {
    showProductDetails(product);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-start space-x-8">
          <div className="w-1/4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-w-4 aspect-h-3 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-600">
        Error loading latest products: {error}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-start space-x-8">
        {/* Title section */}
        <div className="w-1/4">
          <h2 className="text-3xl font-display text-primary-800 mb-2">Latest Products</h2>
          <p className="text-gray-600">Check out our new additions</p>
        </div>

        {/* Products carousel */}
        <motion.div
          className="flex-1 overflow-hidden select-none"
          onDragStart={() => setDragging(true)}
          onDragEnd={(e, info) => {
            setDragging(false);
            handleDragEnd(e, info);
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          style={{ touchAction: 'none' }}
        >
          <div className="flex gap-4">
            <AnimatePresence mode="popLayout">
              {activeIndices.map((index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-1/4 flex-shrink-0 cursor-pointer"
                  onClick={() => handleProductClick(products[index])}
                >
                  <div className="relative group">
                    <img
                      src={products[index].images[0]}
                      alt={products[index].title}
                      className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                      <p className="text-white text-sm font-medium truncate">
                        {products[index].title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}