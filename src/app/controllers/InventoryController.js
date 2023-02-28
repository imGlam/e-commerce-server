const {
  addInventory,
  getInventoryById,
  getBrandInventory,
} = require("../services/InventoryService");

module.exports = {
  addInventory: async (req, res, next) => {
    try {
      const { inventory } = req.body;
      return res.json({
        elements: await addInventory(inventory),
      });
    } catch (err) {
      next(err);
    }
  },
  getInventoryById: async (req, res, next) => {
    try {
      return res.json(await getInventoryById(req.params.id));
    } catch (err) {
      next(err);
    }
  },

};
