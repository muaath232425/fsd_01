const mongoose = require('mongoose');

// Define schema
const CatSchema = new mongoose.Schema({
  name: String,
  color: String,
  company: String
});

// Create model
const Cat = mongoose.model('products', CatSchema);

// Export the model
module.exports = Cat;
