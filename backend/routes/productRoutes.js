// backend/routes/productRoutes.js
import express from 'express';
import { getProductsByTypeAndCategory, getProductImages } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProductsByTypeAndCategory);
router.get('/products/:productId/images', getProductImages);

export default router;