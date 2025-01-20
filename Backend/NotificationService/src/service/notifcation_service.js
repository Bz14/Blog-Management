const { publishMessage } = require("../utils/rabbitmq");
class NotificationService {
  constructor(notificationRepo) {
    this.notificationRepo = notificationRepo;
  }
  createNotification = async ({ userId, type, content }) => {
    const notification = await notificationRepository.saveNotification({
      userId,
      type,
      content,
    });

    const message = { userId, type, content };
    await publishMessage("notification_queue", message);

    return notification;
  };
  getNotificationsByUser = async (userId) => {
    return await notificationRepository.findNotificationsByUser(userId);
  };
}

module.exports = NotificationService;
