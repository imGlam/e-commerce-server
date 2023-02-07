const { Schema, model } = require("mongoose");
const ProductSchema = new Schema(
  {
    productId: { type: Number, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    specs: { type: Array, default: [], unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  _product: model("products", ProductSchema),
};
