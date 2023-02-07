const { Schema, model } = require("mongoose");
const OrderSchema = new Schema(
  {
    userId: String,
    shippingAddress: Object,
    userInfo: Object,
    payment: { type: String, default: "cash" },
    products: Array,
    subTotal: { type: Number, default: 0 },
    state: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

// OrderSchema.pre("save", async () => {
//   console.log("order successfully saved");
// });

module.exports = {
  _order: model("orders", OrderSchema),
};
