const connectRabbitMQ = require("./utils/rabbitmq");
const sendEmail = require("./utils/email_service");

const consumeEmails = async () => {
  const channel = await connectRabbitMQ();
  await channel.assertQueue("email_queue", { durable: true });

  channel.consume("email_queue", async (msg) => {
    const emailMessage = JSON.parse(msg.content.toString());
    try {
      await sendEmail(emailMessage);
      console.log("Email sent:");
      channel.ack(msg);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  });
};

consumeEmails();
