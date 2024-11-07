// src/components/Navigation.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigationRef = useRef(null);
  const { showProductList } = useProduct();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const categories = {
    table: ['Coffee Table', 'Side Table', 'Drum Table'],
    chair: ['Farmhouse Chair', 'Traditional Chair', 'Folding Chair'],
    door: ['Panel Door', 'Flush Door', 'Pocket Door']
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
      setSelectedCategory(null);
    }, 150); // Small delay to prevent menu flickering
  };

  const handleCategoryEnter = (category) => {
    setSelectedCategory(category);
  };

  const handleNavClick = (path, view) => {
    navigate(path);
    setHoveredMenu(null);
    setSelectedCategory(null);
  };

  return (
    <nav ref={navigationRef} className="relative z-50">
      <ul className="flex items-center space-x-8">
        {/* Furniture Menu */}
        <li 
          className="relative"
          onMouseEnter={() => handleMouseEnter('furniture')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="py-2 text-primary-800 hover:text-primary-600 transition-colors font-medium relative group"
          >
            Furniture
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>

          <AnimatePresence>
            {hoveredMenu === 'furniture' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2"
                onMouseEnter={() => handleMouseEnter('furniture')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex bg-white rounded-lg shadow-xl overflow-hidden min-w-[500px]">
                  {/* Categories */}
                  <ul className="w-48 py-2 border-r border-gray-100 bg-white">
                    {Object.keys(categories).map((category) => (
                      <li
                        key={category}
                        className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                          selectedCategory === category 
                            ? 'bg-primary-50 text-primary-800' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => handleCategoryEnter(category)}
                      >
                        <motion.span
                          initial={false}
                          animate={{
                            x: selectedCategory === category ? 5 : 0,
                          }}
                          className="block"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </motion.span>
                      </li>
                    ))}
                  </ul>

                  {/* Product Types */}
                  <AnimatePresence mode="wait">
                    {selectedCategory && (
                      <motion.ul
                        key={selectedCategory}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-56 py-2 bg-white"
                      >
                        {categories[selectedCategory].map((item) => (
                          <motion.li
                            key={item}
                            whileHover={{ x: 5 }}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                            onClick={() => {
                              showProductList(item, selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1));
                              setHoveredMenu(null);
                              setSelectedCategory(null);
                              navigate('/');
                            }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        {/* Other Navigation Items */}
        {[
          { title: 'Contact Us', path: '/contact' },
          { title: 'About Us', path: '/about' },
          { title: 'E-Catalogue', path: '/ecatalogue' },
          { title: 'Blog', path: '/blog' }
        ].map((item) => (
          <li key={item.title}>
            <button 
              onClick={() => handleNavClick(item.path)}
              className="py-2 text-primary-800 hover:text-primary-600 transition-colors font-medium relative group"
            >
              {item.title}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}