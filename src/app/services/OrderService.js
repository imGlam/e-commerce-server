const { _order } = require("../models/OrderModel");
const { _cart } = require("../models/CartModel");

module.exports = {
  addToOrder: async (userId, shippingAddress, userInfo) => {
    try {
      const orderProducts = await _cart
        .findOne({ userId })
        .select({ products: 1 });
      if (orderProducts) {
        const newOrder = new _order({
          userId,
          shippingAddress,
          userInfo,
          products: orderProducts,
        });
        return await newOrder.save();
      }
    } catch (err) {
      console.log(err);
    }
  },
};
