const amqplib = require("amqplib");

const receiveQueue = async () => {
  try {
    // 1. create connection
    const connection = await amqplib.connect(
      "amqps://hsqnuqps:z6XFFpe4VMENV9AGs62nAsdAcBYzOetf@armadillo.rmq.cloudamqp.com/hsqnuqps"
    );
    // 2. create channel
    const channel = await connection.createChannel();
    // 3. create queue name
    const queueName = "q1";
    // 4. create queue
    await channel.assertQueue(queueName, {
      durable: false,
    });
    // 5. receive queue
    await channel.consume(
      queueName,
      (msg) => {
        console.log(msg.content.toString());
      },
      {
        noAck: false,
      }
    );
    // 6. close connection and channel
  } catch (err) {
    console.error(err);
  }
};

receiveQueue();
