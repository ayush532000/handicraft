// src/components/admin/ProductForm.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { API_URL } from '../../config/api';
import { categories } from '../../config/categories';

export default function ProductForm({ onClose, existingProduct = null }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    productCode: '',
    introduction: '',
    materialDetails: '',
    craftsmanship: '',
    designAndStyle: '',
    functionalityAndUse: '',
    callToAction: '',
    dimensions: '',
    isLatestAddition: false // Add this field

  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        title: existingProduct.title || '',
        category: existingProduct.category || '',
        type: existingProduct.type || '',
        productCode: existingProduct.productCode || '',
        introduction: existingProduct.introduction || '',
        materialDetails: existingProduct.materialDetails || '',
        craftsmanship: existingProduct.craftsmanship || '',
        designAndStyle: existingProduct.designAndStyle || '',
        functionalityAndUse: existingProduct.functionalityAndUse || '',
        callToAction: existingProduct.callToAction || '',
        dimensions: existingProduct.dimensions || '',
        isLatestAddition: existingProduct.isLatestAddition || false
      });
      setSelectedCategory(existingProduct.category || '');
      setSelectedImages(existingProduct.images || []);
    }
  }, [existingProduct]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (selectedImages.length + files.length > 6) {
      setError('Maximum 6 images allowed');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title || !formData.category || !formData.type || !formData.productCode || !formData.dimensions) {
      setError('Please fill in all required fields');
      return;
    }

    if (selectedImages.length === 0) {
      setError('Please add at least one image');
      return;
    }

    if (!window.confirm('Are you sure you want to submit this product?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = existingProduct 
        ? `${API_URL}/products/${existingProduct._id}`
        : `${API_URL}/products`;

      const method = existingProduct ? 'PUT' : 'POST';

      // Keep the storage format strings from the form data
      const formDataToSubmit = {
        ...formData,
        images: selectedImages,
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      onClose();
    } catch (err) {
      setError(err.message || 'An error occurred while saving the product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!existingProduct) return;

    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products/${existingProduct._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setFormData(prev => ({
                ...prev,
                category: e.target.value,
                type: ''
              }));
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select Category</option>
            {Object.entries(categories).map(([key, category]) => (
              <option key={key} value={category.name}>
                {category.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Type Selection */}
        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Type</option>
              {Object.entries(categories).map(([_, category]) => 
                category.name === selectedCategory &&
                category.items.map(item => (
                  <option key={item} value={item}>
                    {category.displayItems[item]}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        {/* Product Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.productCode}
            onChange={(e) => setFormData(prev => ({ ...prev, productCode: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Description Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
          <textarea
            value={formData.introduction}
            onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material Details</label>
          <textarea
            value={formData.materialDetails}
            onChange={(e) => setFormData(prev => ({ ...prev, materialDetails: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Craftsmanship</label>
          <textarea
            value={formData.craftsmanship}
            onChange={(e) => setFormData(prev => ({ ...prev, craftsmanship: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Design and Style</label>
          <textarea
            value={formData.designAndStyle}
            onChange={(e) => setFormData(prev => ({ ...prev, designAndStyle: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Functionality and Use</label>
          <textarea
            value={formData.functionalityAndUse}
            onChange={(e) => setFormData(prev => ({ ...prev, functionalityAndUse: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Call to Action</label>
          <textarea
            value={formData.callToAction}
            onChange={(e) => setFormData(prev => ({ ...prev, callToAction: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>


      {/* Latest Addition Toggle */}
      <div className="flex items-center space-x-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={formData.isLatestAddition}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              isLatestAddition: e.target.checked
            }))}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">Latest Addition</span>
        </label>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Images <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <p className="text-sm text-gray-500 mt-1">Maximum 6 images allowed</p>

        {/* Image Preview */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>

        {existingProduct && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            disabled={isSubmitting}
          >
            Delete
          </button>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : existingProduct ? 'Update' : 'Submit'}
        </button>
      </div>
    </motion.form>
  );
}

ProductForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingProduct: PropTypes.object
};