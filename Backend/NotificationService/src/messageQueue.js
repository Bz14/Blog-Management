const { initRabbitMQ } = require("./utils/rabbitmq");
const sendEmail = require("./utils/email_service");

const consumeNotifications = async () => {
  const channel = await initRabbitMQ();
  await channel.assertQueue("notification_queue", { durable: true });

  channel.consume("notification_queue", async (msg) => {
    const notification = JSON.parse(msg.content.toString());
    try {
      console.log("Processing notification:", notification);
      if (notification.type === "email") {
        await sendEmail(notification.content);
      } else if (notification.type === "push") {
        console.log("Pushed");
        // await sendPushNotification(notification.userId, notification.content);
      }

      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process notification:", error);
    }
  });
};

consumeNotifications();