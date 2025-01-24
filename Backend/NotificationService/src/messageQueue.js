const { initRabbitMQ } = require("./utils/rabbitmq");
const sendEmail = require("./utils/email_service");

const consumeNotifications = async () => {
  const channel = await initRabbitMQ();
  await channel.assertQueue("notification_queue", { durable: true });

  channel.consume("notification_queue", async (msg) => {
    const notification = JSON.parse(msg.content.toString());
    console.log(notification);
    try {
      if (notification.type === "email") {
        await sendEmail(notification.message);
      } else if (notification.type === "blog_created") {
        console.log("Pushed");
        await sendEmail(notification.message);
        // await sendPushNotification(notification.userId, notification.content);
      }

      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process notification:", error);
    }
  });
};

consumeNotifications();
