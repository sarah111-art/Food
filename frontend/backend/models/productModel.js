import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  sizes: {
    type: [String],
    required: true,
  },
});
const productModel = mongoose.model('Product', productSchema);
export default productModel;