"use strict";

const {
  setPromise,
  getPromise,
  addToCartRedis,
  getCartItemsRedis,
  removeOneFromCartRedis,
} = require("../services/RedisService");

var that = (module.exports = {
  setPromise: async (req, res, next) => {
    try {
      const { key, payload } = req.body;
      return res.json({
        data: await setPromise({ key, value: JSON.stringify(payload) }),
      });
    } catch (err) {
      next(err);
    }
    next();
  },
  getPromise: async (req, res, next) => {
    try {
      const { id } = req.params;
      return res.json({
        data: await getPromise(id),
      });
    } catch (err) {
      console.log(err);
    }
    next();
  },
  addToCart: async (req, res, next) => {
    try {
      const { productId, quantity, userId } = req.body;
      return res.json(await addToCartRedis({ userId, productId, quantity }));
    } catch (err) {
      next(err);
    }
  },
  removeFromCart: async (req, res, next) => {
    try {
      const { productId, quantity, userId } = req.body;
      return res.json(await removeOneFromCartRedis({ userId, productId }));
    } catch (err) {
      console.log(err);
    }
  },
  getCartItems: async (req, res, next) => {
    try {
      const { userId } = req.params;
      res.json(await getCartItemsRedis(userId));
    } catch (err) {
      next(err);
    }
  },
});
