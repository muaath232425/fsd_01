// import mongoose
const mongoose = require("mongoose");

// model import
const Cat = require("../models/product");


// get all
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Cat.find({});
    res.render("products_index", { products: product }); 
  } catch (err) {
    res.status(500).send(" Failed to fetch products");
  }
};


// add new
exports.addProduct = (req, res) => {
  const { name, color, company } = req.body;

  const kitty = new Cat({ name, color, company });

  kitty.save().then(() => console.log("saved"));

  res.send(kitty + " saved");
};

// gop add page
exports.addpage = (req, res) => {
  res.render("product_add");
};

// update
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, color, company } = req.body;
  await Cat.findByIdAndUpdate(id, { name, color, company });
  res.redirect("/products");
};


// delete
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Cat.findByIdAndDelete(id);
  res.redirect("/products");
};