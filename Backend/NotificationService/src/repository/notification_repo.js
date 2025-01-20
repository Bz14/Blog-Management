const Notification = require("../models/notification");

class NotificationRepo {
  constructor() {}

  saveNotification = async ({ userId, type, content }) => {
    const notification = new Notification({
      userId,
      type,
      content,
      isRead: false,
    });
    return await notification.save();
  };

  findNotificationsByUser = async (userId) => {
    return await Notification.find({ userId }).sort({ createdAt: -1 });
  };
}

module.exports = NotificationRepo;
