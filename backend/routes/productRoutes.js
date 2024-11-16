// backend/routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Create new product
router.post('/products', async (req, res) => {
  try {
    console.log('Received product data:', req.body);
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error saving product:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'A product with this product code already exists' 
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(400).json({ 
      message: error.message || 'Failed to save product'
    });
  }
});

// Get products by category and type
router.get('/products', async (req, res) => {
  try {
    const { category, type } = req.query;
    const query = {};
    
    if (category) query.category = category.toLowerCase();
    if (type) query.type = type.toLowerCase();
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 });
      
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'A product with this product code already exists' 
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(400).json({ 
      message: error.message || 'Failed to update product'
    });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/latest-products', async (req, res) => {
  try {
    const latestProducts = await Product.find({ isLatestAddition: true })
      //.select('title images category type')  // Select only needed fields
      .sort({ createdAt: -1 }); // Most recent first
    
    res.json(latestProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;