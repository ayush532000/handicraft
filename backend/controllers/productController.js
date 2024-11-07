// backend/controllers/productController.js
import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';

export const getProductsByTypeAndCategory = async (req, res) => {
  try {
    const { productType, productCategory } = req.query;
    console.log('Fetching products with:', { productType, productCategory });
    
    // Find without any conditions first
    const allProducts = await Product.find();
    console.log('All products:', JSON.stringify(allProducts, null, 2));

    // Then try our filtered query
    const products = await Product.find({ productType, productCategory });
    console.log('Filtered products:', JSON.stringify(products, null, 2));
    
    res.json(products);
  } catch (error) {
    console.error('Error in getProductsByTypeAndCategory:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductImages = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log('Fetching images for product:', productId);
    const productImages = await ProductImage.findOne({ productId });
    console.log('Found images:', productImages ? 'yes' : 'no');
    if (!productImages) {
      return res.status(404).json({ message: 'No images found for this product' });
    }
    res.json(productImages);
  } catch (error) {
    console.error('Error in getProductImages:', error);
    res.status(500).json({ message: error.message });
  }
};