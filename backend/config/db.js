import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Add these options explicitly
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add a longer timeout
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Test the connection by trying to get collections
    const collections = await mongoose.connection.db.collections();
    console.log('Available collections:', collections.map(c => c.collectionName));
    
    // Try to count documents in the Product collection
    const productCount = await mongoose.connection.db.collection('products').countDocuments();
    console.log('Number of products in database:', productCount);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to MongoDB. Please check:');
      console.error('1. Network connectivity');
      console.error('2. MongoDB URI is correct');
      console.error('3. MongoDB server is running');
    }
    process.exit(1);
  }
};

// Add connection error handlers
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

export default connectDB;