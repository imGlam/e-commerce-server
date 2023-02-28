const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  getBrandProducts,
} = require("../app/controllers/ProductController");

router.post("/add", addProduct);
router.get("/get/brand", getBrandProducts);
router.patch("/update/:id", updateProductById);
router.get("/get/:id", getProductById);
router.get("/get", getProducts);

module.exports = router;
