// backend/scripts/resetIndexes.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const resetIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Drop all indexes
    await mongoose.connection.collection('products').dropIndexes();
    console.log('Indexes dropped successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting indexes:', error);
    process.exit(1);
  }
};

resetIndexes();