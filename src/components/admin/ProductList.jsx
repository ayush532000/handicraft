// src/components/admin/ProductList.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ProductForm from './ProductForm';
import { API_URL } from '../../config/api';
import { categories } from '../../config/categories';

// Helper function to find display names
const getDisplayNames = (categoryStr, typeStr) => {
  const category = Object.values(categories).find(cat => cat.name === categoryStr);
  return {
    categoryDisplay: category ? category.displayName : categoryStr,
    typeDisplay: category ? category.displayItems[typeStr] : typeStr
  };
};

export default function ProductList({ category, type, onBack, categories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [category, type]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // category and type are already in storage format from AdminDashboard
      const response = await fetch(`${API_URL}/products?category=${category}&type=${type}`);
      
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

  if (editingProduct) {
    return (
      <div>
        <button
          onClick={() => setEditingProduct(null)}
          className="mb-6 flex items-center text-primary-600 hover:text-primary-800 transition-colors group"
        >
          <span>← Back to Products</span>
        </button>
        <ProductForm
          existingProduct={editingProduct}
          onClose={() => {
            setEditingProduct(null);
            fetchProducts();
          }}
          categories={categories}
        />
      </div>
    );
  }

  const { categoryDisplay, typeDisplay } = getDisplayNames(category, type);

  if (loading) {
    return (
      <div className="space-y-4">
        <button onClick={onBack} className="text-primary-600 hover:text-primary-800">
          ← Back to Selection
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <button onClick={onBack} className="text-primary-600 hover:text-primary-800">
          ← Back to Selection
        </button>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-primary-600 hover:text-primary-800 transition-colors"
        >
          ← Back to Selection
        </button>
        <h2 className="text-xl font-medium text-primary-800">
          {categoryDisplay} - {typeDisplay}
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No products found for this category and type.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setEditingProduct(product)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-primary-800 mb-1">{product.title}</h3>
                <p className="text-sm text-gray-600">Code: {product.productCode}</p>
                <button
                  className="mt-2 text-primary-600 hover:text-primary-800 text-sm flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingProduct(product);
                  }}
                >
                  View/Edit →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

ProductList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};