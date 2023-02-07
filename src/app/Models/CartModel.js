const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    userId: String,
    status: { type: String, default: "active" },
    modifiedOn: { type: Date, default: Date.now },
    products: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = {
  _cart: model("carts", CartSchema),
};
