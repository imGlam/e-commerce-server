const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCartItems,
  getQuantity,
} = require("../app/controllers/CartController");

router.post("/add", addToCart);
router.patch("/remove", removeFromCart);
router.get("/get-quantity/:userId", getQuantity);
router.get("/get/:userId", getCartItems);

module.exports = router;
