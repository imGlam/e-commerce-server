const amqplib = require("amqplib");

const receiveNoti = async () => {
  try {
    // 1. create connection
    const connection = await amqplib.connect(
      "amqps://hsqnuqps:z6XFFpe4VMENV9AGs62nAsdAcBYzOetf@armadillo.rmq.cloudamqp.com/hsqnuqps"
    );

    // 2. create channel
    const channel = connection.createChannel();

    // 3. create exchange
    const exchangeName = "video";

    (await channel).assertExchange(exchangeName, "fanout", {
      durable: false,
    });

    // 4. create queue

    const { queue } = (await channel).assertQueue("");
    console.log(`queueName ::: ${queue}`);

    // 5. binding
    (await channel).bindQueue(queue, exchangeName, "");
    (await channel).consume(
      queue,
      (msg) => {
        console.log(`msg ::: ${msg}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

receiveNoti();
