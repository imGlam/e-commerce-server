const express = require("express");
const app = express();
const publisher = require("../src/databases/redis");
publisher.configSet("notify-keyspace-events", "Ex");

app.get("/", (req, res) => {
  const user = {
    id: "123456",
    name: "Davis",
  };
  publisher.publish("user-notify", JSON.stringify(user));
  res.send("Publishing an Event using Redis");
});

app.listen(4002, () => {
  console.log(`Order is running on port 4002`);
});
