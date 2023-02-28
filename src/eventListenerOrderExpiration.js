const express = require("express");
const app = express();
const client = require("../src/databases/redis");
const products = [];

client.pSubscribe("o");
client.on("pmessage", (channel, message) => {
  products.push(JSON.parse(message));
});

app.use("/subscriber", (req, res) => {
  res.json(products);
});
app.use("/", (req, res) => {
  res.send("subscriber");
});

app.listen(4001, () => {
  console.log(`EventListener is running on port 4001`);
});
