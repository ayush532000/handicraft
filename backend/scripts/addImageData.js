// backend/scripts/addImageData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductImage from '../models/ProductImage.js';

dotenv.config();

const imageData = [
  {
    productId: "101",
    images: [
      "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_b_2_qqe2gb.jpg",
      "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_1_veyjzs.jpg",
      "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_4_bkekyg.jpg",
      "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
      "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_2_xfyb9k.jpg"
    ]
  },
  {
    productId: "102",
    images: [
      "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_b_2_qqe2gb.jpg",
      "https://res.cloudinary.com/digi69oig/image/upload/v1729678755/coffee_table_b_1_vmw02x.jpg"
    ]
  }
];

const seedImageData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing image data
    await ProductImage.deleteMany({});
    
    // Add new image data
    await ProductImage.insertMany(imageData);
    
    console.log('Image data added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding image data:', error);
    process.exit(1);
  }
};

seedImageData();