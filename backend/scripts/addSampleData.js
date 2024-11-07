// backend/scripts/addSampleData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    productId: "101",
    productName: "Coffee Table A",
    productImage: "https://res.cloudinary.com/digi69oig/image/upload/v1729667347/image2_b6g43j.jpg",
    productDescription: "Elegantly crafted coffee table featuring solid wood construction with a rich walnut finish. Perfect centerpiece for any living room with its spacious surface and sleek modern design.",
    productType: "Coffee Table",
    productCategory: "Table"
  },
  {
    productId: "102",
    productName: "Coffee Table B",
    productImage: "https://res.cloudinary.com/digi69oig/image/upload/v1729667347/image1_jqplhq.jpg",
    productDescription: "Contemporary coffee table with minimalist design, combining glass top and wooden base. Features built-in storage compartment for magazines and remote controls.",
    productType: "Coffee Table",
    productCategory: "Table"
  },
  {
    productId: "103",
    productName: "Coffee Table C",
    productImage: "https://res.cloudinary.com/digi69oig/image/upload/v1729667347/image3_bt8y81.jpg",
    productDescription: "Rustic-inspired coffee table with reclaimed wood top and industrial metal frame. Includes lower shelf for additional storage and display space.",
    productType: "Coffee Table",
    productCategory: "Table"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing products
    await Product.deleteMany({ productType: "Coffee Table" });
    
    // Add new products
    await Product.insertMany(sampleProducts);
    
    console.log('Sample data added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();