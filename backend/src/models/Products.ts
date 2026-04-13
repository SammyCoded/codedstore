import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String }, // URL of the uploaded image
  createdAt: { type: Date, default: Date.now },
});

// This prevents Mongoose from creating the model twice during hot-reloads
const Product = models.Product || model('Product', ProductSchema);

export default Product;