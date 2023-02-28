const { paginate } = require("../services/UserService");

var that = (module.exports = {
  paginate: async (req, res, next) => {
    try {
      const { page, pagesize } = req.query;
      return res.json(await paginate({page, pagesize}));
    } catch (err) {
      next(err);
    }
  },
});
