const express = require("express");
const app = express();
const subscribe = require("../src/databases/redis");
let message;
subscribe.subscribe("orderSystem");
subscribe.on("message", (channel, message) => {
  console.log(`The channel for sendEmail is  ${channel}`);
  console.log(`Message for sendEmail is ${JSON.parse(message)}`);
  message = { message };
});
app.use("/", (req, res) => {
  res.json(message);
});

app.listen(4004, () => {
  console.log(`sendEmail is running on port 4004`);
});
