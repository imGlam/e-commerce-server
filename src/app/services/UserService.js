const { _user } = require("../models/UserModel");

var that = (module.exports = {
  paginate: async ({ page = 1, pagesize = 4 }) => {
    return await _user
      .find({})
      .skip((page - 1) * pagesize)
      .limit(pagesize);
  },
});
