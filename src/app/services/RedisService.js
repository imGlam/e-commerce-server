const client = require("../../databases/redis");

var that = (module.exports = {
  setPromise: async ({ key, value }) => {
    try {
      return await client.set(key, value);
    } catch (err) {}
  },
  getPromise: async (key) => {
    try {
      return await client.get(key);
    } catch (err) {}
  },
});
