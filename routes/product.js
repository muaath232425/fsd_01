//  most need

const express = require("express");
const router = express.Router();

// controller
const { getAllProducts } = require("../controllers/productController");

const { addProduct } = require("../controllers/productController");

const { updateProduct } = require("../controllers/productController");

const { deleteProduct } = require("../controllers/productController");


// get / limit / search / more
router.get("/", getAllProducts); 

// add new
router.post("/", addProduct);

router.put("/update/:id", updateProduct); // controller logic to update

router.delete("/delete/:id", deleteProduct); // controller logic to delete

// export router
module.exports = router;
