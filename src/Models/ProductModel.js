const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Product", ProductSchema);
