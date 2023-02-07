const express = require("express");
const router = express.Router();
const {
  addInventory,
  getInventoryById,
} = require("../app/controllers/InventoryController");

router.post("/add", addInventory);
router.get("/get/:id", getInventoryById);

module.exports = router;
