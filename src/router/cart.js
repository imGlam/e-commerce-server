const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCartItems,
} = require("../app/controllers/CartController");

router.post("/add", addToCart);
router.patch("/remove", removeFromCart);
router.get("/get/:id", getCartItems);

module.exports = router;
