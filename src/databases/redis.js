const { createClient } = require("redis");
const client = createClient({
  url: process.env.REDIS_URI,
});

client
  .connect()
  .then(() => {
    client.ping().then((res) => console.log(res));

    client.on("connect", () => {
      console.log("Redis client connected with URI");
    });
  })
  .catch(() => {
    client.on("error", (err) => {
      console.error(err);
    });
  });

module.exports = client;
