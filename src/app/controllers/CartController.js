const {
  addToCart,
  removeFromCart,
  getCartItems,
} = require("../services/CartService");

const {
  addToCartRedis,
  getCartItemsRedis,
  removeOneFromCartRedis,
  getQuantityRedis,
} = require("../services/RedisService");

module.exports = {
  addToCart: async (req, res, next) => {
    try {
      const { productId, quantity, userId } = req.body;
      // const userId = req.sessionID;
      return res.json(await addToCartRedis({ userId, productId, quantity }));
      // addToCartRedis({ userId, productId, quantity });
    } catch (err) {
      next(err);
    }
  },
  removeFromCart: async (req, res, next) => {
    try {
      const { productId } = req.body;
      const userId = req.sessionID;
      return res.json(await removeOneFromCartRedis({ userId, productId }));
    } catch (err) {
      console.log(err);
    }
  },
  getCartItems: async (req, res, next) => {
    try {
      const { userId } = req.params;
      // const userId = req.sessionID;
      res.json(await getCartItemsRedis(userId));
    } catch (err) {
      next(err);
    }
  },
  getQuantity: async (req, res, next) => {
    try {
      const { userId } = req.params;
      // const userId = req.sessionID;
      return res.json(await getQuantityRedis(userId));
    } catch (error) {}
  },
};
