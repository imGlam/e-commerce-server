const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.set("strictQuery", true);

const ClothSchema = new Schema(
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

mongoose.plugin(slug);
ClothSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Cloth", ClothSchema);
