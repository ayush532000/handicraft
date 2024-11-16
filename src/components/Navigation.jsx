// src/components/Navigation.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../config/categories';

export default function Navigation() {
  const [showFurniture, setShowFurniture] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);
  const { showProductList } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCloseMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCloseMenu = () => {
    setShowFurniture(false);
    setHoveredCategory(null);
  };

  const handleProductClick = (item, category) => {
    handleCloseMenu();
    // Pass the storage format strings for both category and type
    showProductList(item, category.name);
    navigate('/');
  };

  return (
    <nav className="relative" ref={menuRef}>
      <ul className="flex items-center space-x-8">
        {/* Furniture Menu */}
        <li className="relative">
          <button
            onClick={() => setShowFurniture(!showFurniture)}
            onMouseEnter={() => setShowFurniture(true)}
            className="px-4 py-2 text-primary-800 hover:text-primary-600 font-medium transition-colors text-lg tracking-wide"
          >
            Furniture
          </button>

          <AnimatePresence>
            {showFurniture && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-1 bg-white rounded-lg shadow-lg"
                style={{ width: '480px' }}
                onMouseLeave={() => setShowFurniture(false)}
              >
                <div className="flex">
                  {/* Categories */}
                  <div className="w-1/2 py-2 border-r border-gray-100">
                    {Object.entries(categories).map(([key, category]) => (
                      <div
                        key={key}
                        className={`px-4 py-2 cursor-pointer transition-colors text-base ${
                          hoveredCategory === key 
                            ? 'bg-primary-50 text-primary-800' 
                            : 'text-primary-800 hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => setHoveredCategory(key)}
                      >
                        {/* Show display name to user */}
                        {category.displayName}
                      </div>
                    ))}
                  </div>

                  {/* Product Types */}
                  <div className="w-1/2 py-2">
                    <AnimatePresence mode="wait">
                      {hoveredCategory && (
                        <motion.div
                          key={hoveredCategory}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {categories[hoveredCategory].items.map((item) => (
                            <button
                              key={item}
                              onClick={() => handleProductClick(item, categories[hoveredCategory])}
                              className="w-full text-left px-4 py-2 text-primary-800 hover:bg-primary-50 transition-colors text-sm"
                            >
                              {/* Show display name to user */}
                              {categories[hoveredCategory].displayItems[item]}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        {/* Other Navigation Items */}
        <li>
          <button 
            onClick={() => navigate('/contact')}
            className="px-4 py-2 text-primary-800 hover:text-primary-600 font-medium transition-colors text-lg tracking-wide"
          >
            Contact Us
          </button>
        </li>
        <li>
          <button 
            onClick={() => navigate('/about')}
            className="px-4 py-2 text-primary-800 hover:text-primary-600 font-medium transition-colors text-lg tracking-wide"
          >
            About Us
          </button>
        </li>
      </ul>
    </nav>
  );
}