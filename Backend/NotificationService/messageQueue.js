const { initRabbitMQ } = require("./rabbitmq");

const consumeNotifications = async () => {
  const channel = await initRabbitMQ();
  await channel.assertQueue("notification_queue", { durable: true });

  channel.consume("notification_queue", async (msg) => {
    const notification = JSON.parse(msg.content.toString());
    try {
      console.log("Processing notification:", notification);
      if (notification.type === "email") {
        await sendEmail(notification.userId, notification.content);
      } else if (notification.type === "push") {
        await sendPushNotification(notification.userId, notification.content);
      }

      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process notification:", error);
    }
  });
};

module.exports = { consumeNotifications };
