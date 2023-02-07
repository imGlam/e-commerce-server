const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
} = require("../app/controllers/ProductController");

router.post("/add", addProduct);
router.get("/get/:id", getProductById);
router.get("/get", getProducts);

module.exports = router;
