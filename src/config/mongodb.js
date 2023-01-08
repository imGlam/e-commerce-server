const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongo connected");
  } catch (error) {
    console.log("failed to connect to Mongo");
  }
}

module.exports = { connect };
