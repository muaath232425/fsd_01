const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../controllers/productController");

const { addProduct } = require("../controllers/productController");

const { addpage } = require("../controllers/productController");

const { updateProduct } = require("../controllers/productController");

const { deleteProduct } = require("../controllers/productController");



router.get("/", getAllProducts); // controller logic to get all

router.post("/", addProduct); // controller logic to add

router.get("/add", addpage); // controller logic to add page

router.post("/update/:id", updateProduct); // controller logic to update
router.post("/delete/:id", deleteProduct); // controller logic to delete


module.exports = router;
