const amqp = require("amqplib");
require("dotenv").config();

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    console.log("RabbitMQ connected");
    return connection.createChannel();
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    process.exit(1);
  }
};

module.exports = connectRabbitMQ;
