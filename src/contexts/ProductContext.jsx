// src/contexts/ProductContext.jsx
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  const resetToHome = () => {
    setCurrentProduct(null);
    setCurrentView('home');
  };

  const showProductList = (type, category) => {
    // Force reset current product to ensure product list is shown
    setCurrentProduct({
      type: type,
      category: category,
      forceRefresh: Date.now() // Add this to force re-render when same type is selected
    });
    setCurrentView('product');
  };

  const setView = (view) => {
    setCurrentView(view);
    setCurrentProduct(null);
  };

  return (
    <ProductContext.Provider 
      value={{ 
        currentProduct, 
        currentView,
        resetToHome,
        showProductList,
        setView,
        setCurrentProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useProduct() {
  return useContext(ProductContext);
}