const mongoose = require("mongoose");

// Define schema
const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "name min 3 need"],
    trim: true,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instock: {
    type: Boolean,
    default: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    trim: true,
  },
  releaseDate: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

// Create model
const Products = mongoose.model("products", CatSchema);

// Export the model
module.exports = Products;
