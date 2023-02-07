const {
  addToCart,
  removeFromCart,
  getCartItems,
} = require("../services/CartService");

module.exports = {
  addToCart: async (req, res, next) => {
    try {
      const { productId, quantity, price, userId } = req.body;
      return await addToCart(productId, quantity, userId, price);
    } catch (err) {
      next(err);
    }
  },
  removeFromCart: async (req, res, next) => {
    try {
      const { productId, quantity, userId } = req.body;
      return res.json(await removeFromCart(userId, productId, quantity));
    } catch (err) {
      console.log(err);
    }
  },
  getCartItems: async (req, res, next) => {
    try {
      return res.json(await getCartItems(req.params.id));
    } catch (err) {
      next(err);
    }
  },
};
