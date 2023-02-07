const { addToOrder } = require("../services/OrderService");

module.exports = {
  addToOrder: async (req, res, next) => {
    try {
      const userId = req.session.id;
      const {
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
        elements: await addToOrder(userId, shippingAddress, userInfo),
      });
    } catch (err) {
      next(err);
    }
  },
};
