// backend/models/ProductImage.js
import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  images: [{
    type: String,
    required: true
  }]
});

export default mongoose.model('ProductImage', productImageSchema);