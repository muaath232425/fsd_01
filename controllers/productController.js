// import mongoose use db
const mongoose = require("mongoose");

// model import use collectio
const Products = require("../models/product");

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Get limit & page from query string
    // define varibles
    const limit = parseInt(req.query.limit) || 0; // per page limit  0 = All
    const page = parseInt(req.query.page) || 1; // current page 1 = default
    const search = req.query.search || ""; // search query

    // but i block this option not get all
    if (limit === 0) {
      return res.status(400).json({
        message: "Limit cannot be 0. Please provide a valid number.",
      });
    }

    // Build search filter
    const filter = search
      ? { name: { $regex: search, $options: "i" } } // case-insensitive search on 'name'
      : {};

    // epdi skip ndekkumda
    // ex give
    // limit = 2
    // page = 3

    // skip = (3 - 1) * 2
    // skip = 2 * 2
    // skip = 4

    // kalichhci perukki apporem vare counta skip panni athukku apporem ullethule kuduththe limit a edukkum

    const skip = (page - 1) * limit; // skip count

    // Get total count for pagination info
    const totalProducts = await Products.countDocuments();

    // total pages
    const totalPages = limit > 0 ? Math.ceil(totalProducts / limit) : 1;

    // if page exceeds
    if (page > totalPages) {
      return res.status(400).json({
        message: `Page ${page} exceeds total pages ${totalPages}`,
        currentPage: page,
      });
    }

    // Fetch paginated products
    // Fetch paginated  searched products
    const products = await Products.find(filter).limit(limit).skip(skip);

    // if get product length == 0 cheack
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found matching your search",
        currentPage: page,
      });
    }

    // all success
    res.status(200).json({
      message: "Products fetched successfully",
      currentPage: page,
      perPage: limit,
      totalProducts: totalProducts,
      totalPages: limit > 0 ? Math.ceil(totalProducts / limit) : 1,
      data: products,
    });
  } catch (err) {
    // error
    console.error("Error fetching products:", err.message);
    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

// add new
exports.addProduct = async (req, res) => {
  try {
    // get req
    const {
      name,
      sku,
      price,
      instock,
      quantity,
      category,
      releaseDate,
      description,
      rating,
    } = req.body;

    // create req sent
    const product = new Products({
      name,
      sku,
      price,
      instock,
      quantity,
      category,
      releaseDate,
      description,
      rating,
    });

    // save
    await product.save();

    // after save
    console.log("Product saved:", product);

    // success save
    res.status(201).json({
      message: "Product saved successfully",
      data: product,
    });
  } catch (error) {
    // any error
    console.error("Error saving product:", error);
    res.status(500).json({
      message: "Error saving product",
      error: error.message,
    });
  }
};

// update
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // product ID from URL

    // data get
    const {
      name,
      sku,
      price,
      instock,
      quantity,
      category,
      releaseDate,
      description,
      rating,
    } = req.body;

    // Find product by ID and update
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {
        name,
        sku,
        price,
        instock,
        quantity,
        category,
        releaseDate,
        description,
        rating,
      },
      { new: true, runValidators: true } // return updated doc, run schema validations
    );

    // if not fount product
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // success update
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    // error
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    // get url
    const { id } = req.params;

    const deletedProduct = await Products.findByIdAndDelete(id);

    // not fount
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // success deleted
    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    // error
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};
