const { _inventory } = require("../models/InventoryModel");

var that = (module.exports = {
  addInventory: async (inventory) => {
    return await _inventory.create(inventory);
  },
  getInventoryById: async (id) => {
    return await _inventory.findOne({
      productId: id,
    });
  },
});
