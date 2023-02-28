const amqplib = require("amqplib");

const postVideo = async ({ msg }) => {
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

    // 4. publish video
    (await channel).publish(exchangeName, "", Buffer.from(msg));

    console.log(`[x] Send ok ::: ${msg}`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.error(error);
  }
};

const msg = process.argv.slice(2).join("") || "Hello Exchange";

postVideo({ msg });
