const express = require("express");
const router = express.Router();

const {
  addToOrder,
  updateOrder,
} = require("../app/controllers/OrderController");

router.post("/add", addToOrder);

module.exports = router;
