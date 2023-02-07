"use strict";

const { setPromise, getPromise } = require("../services/RedisService");

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
  },
  getPromise: async (req, res, next) => {
    try {
      const { key } = req.body;
      return res.json({
        data: await getPromise(key),
      });
    } catch (err) {
      console.log(err);
    }
  },
});
