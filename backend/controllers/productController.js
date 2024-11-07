// backend/controllers/productController.js
import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';

export const getProductsByTypeAndCategory = async (req, res) => {
  try {
    const { productType, productCategory } = req.query;
    const products = await Product.find({ productType, productCategory });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductImages = async (req, res) => {
  try {
    const { productId } = req.params;
    const productImages = await ProductImage.findOne({ productId });
    if (!productImages) {
      return res.status(404).json({ message: 'No images found for this product' });
    }
    res.json(productImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};