const { Schema, model } = require("mongoose");
const ProductSchema = new Schema(
  {
    productId: { type: Number, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, default: Date.now() },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    specs: [
      {
        k: { type: String, required: true },
        v: { type: String, required: true },
      },
    ],
    inStock: {
      type: Schema.Types.ObjectId,
      ref: "inventories",
    },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  _product: model("products", ProductSchema),
};
