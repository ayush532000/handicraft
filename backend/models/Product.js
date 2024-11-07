import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  productType: {
    type: String,
    required: true,
    enum: [
      'Coffee Table', 'Side Table', 'Drum Table',
      'Farmhouse Chair', 'Traditional Chair', 'Folding Chair',
      'Panel Door', 'Flush Door', 'Pocket Door'
    ]
  },
  productCategory: {
    type: String,
    required: true,
    enum: ['Table', 'Chair', 'Door']
  }
});

export default mongoose.model('Product', productSchema);