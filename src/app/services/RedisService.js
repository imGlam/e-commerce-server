const client = require("../../databases/redis");
const { _product } = require("../models/ProductModel");
const { _order } = require("../models/OrderModel");
const { _inventory } = require("../models/InventoryModel");

var that = (module.exports = {
  setPromise: async ({ key, value }) => {
    try {
      return await client.setEx(key, 3600, value);
    } catch (err) {}
  },
  getPromise: async (key) => {
    try {
      return await client.get(key);
    } catch (err) {}
  },
  addToCartRedis: async ({ userId, productId, quantity }) => {
    try {
      await _inventory.updateOne(
        {
          productId: productId,
          quantity: { $gt: quantity },
        },
        {
          $inc: {
            quantity: -quantity,
          },
          $push: {
            reservation: {
              userId,
              productId,
              quantity,
            },
          },
        }
      );

      return new Promise((resolve, reject) => {
        client.hGet(`cart:${userId}`, productId, (err, res) => {
          if (res) {
            client.hIncrBy(
              `cart:${userId}`,
              productId,
              quantity,
              (err, res) => {
                return !err ? resolve(res) : reject(err);
              }
            );
          } else {
            client.hSet(`cart:${userId}`, productId, quantity),
              (err, res) => {
                return !err ? resolve(res) : reject(err);
              };
            client.expire(`cart:${userId}`, 7200);
          }
        });
      });
    } catch (err) {}
  },
  getCartItemsRedis: async (userId, productId) => {
    try {
      return new Promise((resolve, reject) => {
        client.hKeys(`cart:${userId}`, (err, res) => {
          const productIdList = res.map((data) => parseInt(data));
          resolve(
            _product.aggregate([
              {
                $match: { productId: { $in: productIdList } },
              },
              {
                $project: {
                  productId: 1,
                  name: 1,
                  image: 1,
                  price: 1,
                  description: 1,
                },
              },
            ])
          );
        });
      });
    } catch (err) {}
  },
  getQuantityRedis: async (userId) => {
    try {
      return new Promise((resolve, reject) => {
        client.hGetAll(`cart:${userId}`, (err, res) => {
          return !err ? resolve(res) : reject(err);
        });
      });
    } catch (error) {}
  },
  removeOneFromCartRedis: async ({ userId, productId }) => {
    try {
      return new Promise((resolve, reject) => {
        client.hDel(`cart:${userId}`, productId, (err, res) => {
          return !err ? resolve(res) : reject(err);
        });
      });
    } catch (error) {}
  },
  createOrderRedis: async (userId, shippingAddress, userInfo) => {
    try {
      const cartItems = await new Promise((resolve, reject) => {
        client.hGetAll(`cart:${userId}`, (err, res) => {
          resolve(res);
        });
      });
      const productIdList = await new Promise((resolve, reject) => {
        client.hKeys(`cart:${userId}`, (err, res) => {
          resolve(res);
        });
      });
      const newS = productIdList.map((productId) => parseInt(productId));
      const products = await _product.find(
        { productId: { $in: newS } },
        { _id: 0, productId: 1, price: 1 }
      );
      const subTotal = products.reduce(
        (total, product) =>
          total + product.price * cartItems[product.productId],
        0
      );

      // return products.map((product) => cartItems[product.productId]);
      const newOrder = new _order({
        userId,
        shippingAddress,
        userInfo,
        products: cartItems,
        subTotal,
      });
      return await newOrder.save();
    } catch (error) {}
  },
  createOrderRedisTest: async (userId) => {
    try {
      const productIdList = await new Promise((resolve, reject) => {
        client.hKeys(`cart:${userId}`, (err, result) => {
          !err ? resolve(result) : reject(err);
        });
      });
      const quantityList = await new Promise((resolve, reject) => {
        client.hVals(`cart:${userId}`, (err, result) => {
          !err ? resolve(result) : reject(err);
        });
      });
      const cartItems = [];
      for (let i = 0; i < quantityList.length; i++) {
        cartItems.push({
          productId: productIdList[i],
          quantity: quantityList[i],
        });
      }
      let toUupdate = (product) => ({
        updateOne: {
          filter: { productId: product.productId },
          update: {
            $inc: {
              quantity: -parseInt(product.quantity),
            },
          },
        },
      });
      return await _inventory.bulkWrite(cartItems.map(toUupdate));
      return cartItems;
    } catch (error) {}
  },
});
