const amqp = require("amqplib");
require("dotenv").config();

let channel;

const initRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("RabbitMQ connected");
    return channel;
  } catch (err) {
    console.error("Failed to connect to RabbitMQ:", err.message);
  }
};

const publishMessage = (queue, message) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(`Message published to ${queue}`);
};

module.exports = { initRabbitMQ, publishMessage };
