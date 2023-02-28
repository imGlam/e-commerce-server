const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userId: Number,
  username: String,
  password: String,
});

module.exports = {
  _user: model("users", UserSchema),
};
