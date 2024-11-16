// src/contexts/ProductContext.jsx
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [navigationSource, setNavigationSource] = useState(null); // New state for tracking source

  const resetToHome = () => {
    setCurrentProduct(null);
    setCurrentView('home');
    setNavigationSource(null);
  };

  const showProductList = (type, category, source = 'menu') => {
    setCurrentProduct({
      type: type,
      category: category,
      forceRefresh: Date.now()
    });
    setCurrentView('product');
    setNavigationSource(source); // Track where user came from
  };

  const showProductDetails = (product) => {
    setCurrentProduct(product);
    setCurrentView('product-details');
  };

  const setView = (view) => {
    setCurrentView(view);
  };

  return (
    <ProductContext.Provider 
      value={{ 
        currentProduct, 
        currentView,
        navigationSource,
        resetToHome,
        showProductList,
        showProductDetails,
        setView,
        setCurrentProduct,
        setNavigationSource
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