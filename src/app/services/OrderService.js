const { _order } = require("../models/OrderModel");
const { _inventory } = require("../models/InventoryModel");
const client = require("../../databases/redis");

module.exports = {
  createOrder: async (userId, shippingAddress, userInfo, subTotal) => {
    try {
      const products = await client.hGetAll(`cart:${userId}`);

      const newOrder = new _order({
        userId,
        shippingAddress,
        userInfo,
        products: cartItems,
        subTotal,
      });
      return await newOrder.save();
    } catch (err) {
      console.log(err);
    }
  },
  getOrder: async (userId) => {
    try {
      return _order.findOne({ userId });
    } catch (error) {}
  },
};
