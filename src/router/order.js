const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  createOrderRedisTest,
} = require("../app/controllers/OrderController");

router.post("/add", createOrder);
router.post("/add/test", createOrderRedisTest);
router.get("/get/:userId", getOrder);

module.exports = router;
