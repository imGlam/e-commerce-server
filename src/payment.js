const express = require("express");
const app = express();
const subscriber = require("../src/databases/redis");
subscriber.subscribe("keyevent@0:expired", (key) => {
  console.log(key);
});
subscriber.on("message", (channel, message) => {
  console.log("Received data :" + message);
});
app.get("/", (req, res) => {
  res.send("Subscriber One");
});
app.listen(4003, () => {
  console.log(`Payment is running on port 4003`);
});
