const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validateProduct");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", auth, validateProduct, createProduct);
router.put("/:id", auth, validateProduct, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
