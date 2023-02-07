const { Schema, model } = require("mongoose");

const InventorySchema = new Schema(
  {
    productId: Number,
    quantity: Number,
    reservation: Array,
    createAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  _inventory: model("inventories", InventorySchema),
};
