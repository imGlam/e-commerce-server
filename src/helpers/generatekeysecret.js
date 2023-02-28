const crypto = require("crypto");

const accsessKey = crypto.randomBytes(32).toString("hex");
const refreshKey = crypto.randomBytes(32).toString("hex");

module.exports = { accsessKey, refreshKey };
