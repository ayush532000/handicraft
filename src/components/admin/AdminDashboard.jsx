// src/components/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { categories } from '../../config/categories';
import ProductForm from './ProductForm';
import { motion } from 'framer-motion';
import { API_URL } from '../../config/api';

const AdminDashboard = () => {
  const [view, setView] = useState('select');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedType]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/products`;
      
      const filters = [];
      if (selectedCategory) filters.push(`category=${selectedCategory}`);
      if (selectedType) filters.push(`type=${selectedType}`);
      
      if (filters.length > 0) {
        url += `?${filters.join('&')}`;
      }

      const response = await fetch(url);
      
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

  const handleFormClose = () => {
    setView('select');
    setEditingProduct(null);
    fetchProducts(); // Refresh the products list
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-display text-primary-800">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEditingProduct(null); // Clear any editing product
              setView('form');
            }}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add New Product
          </motion.button>
        </div>

        {view === 'form' ? (
          <ProductForm 
            onClose={handleFormClose}
            existingProduct={editingProduct}
          />
        ) : (
          <>
            {/* Filters Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedType('');
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Categories</option>
                    {Object.keys(categories).map((key) => (
                      <option key={key} value={categories[key].name}>
                        {categories[key].displayName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    disabled={!selectedCategory}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">All Types</option>
                    {selectedCategory && Object.keys(categories).map(key => 
                      categories[key].name === selectedCategory &&
                      categories[key].items.map(item => (
                        <option key={item} value={item}>
                          {categories[key].displayItems[item]}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Products List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No products found</p>
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
                    onClick={() => {
                      setEditingProduct(product);
                      setView('form');
                    }}
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
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          {categories[Object.keys(categories).find(key => 
                            categories[key].name === product.category
                          )]?.displayName}
                        </span>
                        {product.isLatestAddition && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                            Latest Addition
                          </span>
                        )}
                      </div>
                      <button
                        className="mt-3 text-primary-600 hover:text-primary-800 text-sm flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProduct(product);
                          setView('form');
                        }}
                      >
                        Edit Product →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;