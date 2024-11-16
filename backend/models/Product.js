// // backend/models/Product.js
// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Product title is required']
//   },
//   category: {
//     type: String,
//     required: [true, 'Product category is required']
//   },
//   type: {
//     type: String,
//     required: [true, 'Product type is required']
//   },
//   productCode: {
//     type: String,
//     required: [true, 'Product code is required'],
//     unique: true
//   },
//   introduction: {
//     type: String
//   },
//   materialDetails: {
//     type: String
//   },
//   craftsmanship: {
//     type: String
//   },
//   designAndStyle: {
//     type: String
//   },
//   functionalityAndUse: {
//     type: String
//   },
//   callToAction: {
//     type: String
//   },
//   dimensions: {
//     type: String,
//     required: [true, 'Product dimensions are required']
//   },
//   images: {
//     type: [String],
//     validate: {
//       validator: function(v) {
//         return v.length > 0 && v.length <= 6;
//       },
//       message: 'Product must have between 1 and 6 images'
//     }
//   }
// }, {
//   timestamps: true
// });

// // Remove any middleware and just keep the unique index
// productSchema.index({ productCode: 1 }, { unique: true });

// export default mongoose.model('Product', productSchema);
// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required']
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  type: {
    type: String,
    required: [true, 'Product type is required']
  },
  productCode: {
    type: String,
    required: [true, 'Product code is required'],
    unique: true
  },
  introduction: String,
  materialDetails: String,
  craftsmanship: String,
  designAndStyle: String,
  functionalityAndUse: String,
  callToAction: String,
  dimensions: {
    type: String,
    required: [true, 'Product dimensions are required']
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length > 0 && v.length <= 6;
      },
      message: 'Product must have between 1 and 6 images'
    }
  },
  isLatestAddition: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

productSchema.index({ productCode: 1 }, { unique: true });

export default mongoose.model('Product', productSchema);