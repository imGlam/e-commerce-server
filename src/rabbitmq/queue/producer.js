const amqplib = require("amqplib");

const sendQueue = async ({ msg }) => {
  try {
    // 1. create connection
    const connection = await amqplib.connect(
      "amqps://hsqnuqps:z6XFFpe4VMENV9AGs62nAsdAcBYzOetf@armadillo.rmq.cloudamqp.com/hsqnuqps"
    );
    // 2. create channel
    const channel = await connection.createChannel();
    // 3. create queue name
    const queueName = "q2";
    // 4. create queue
    await channel.assertQueue(queueName, {
      durable: false,
    });
    // 5. send to queue
    await channel.sendToQueue(queueName, Buffer.from(msg), {
      expiration: "10000", // TTL (Time to live) must be a string
    });
    // 6. close connection and channel
  } catch (err) {
    console.error(err);
  }
};

sendQueue({ msg: "heelo world!" });
