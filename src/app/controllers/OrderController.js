const { getOrder, createOrder } = require("../services/OrderService");
const {
  createOrderRedis,
  createOrderRedisTest,
} = require("../services/RedisService");

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      // const userId = req.session.id;
      const {
        userId,
        fullName,
        email,
        phoneNumber,
        address,
        province,
        district,
        ward,
      } = req.body;
      const userInfo = { fullName, email, phoneNumber };
      const shippingAddress = { address, province, district, ward };

      return res.json({
        elements: await createOrderRedis(userId, shippingAddress, userInfo),
      });
    } catch (err) {
      next(err);
    }
  },
  getOrder: async (req, res, next) => {
    const { userId } = req.params;
    return res.json(await getOrder(userId));
  },
  createOrderRedisTest: async (req, res, next) => {
    const { userId } = req.body;
    return res.json(await createOrderRedisTest(userId));
  },
};
