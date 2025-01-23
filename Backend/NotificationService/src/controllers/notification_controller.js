const ValidateUserToken = require("../utils/token_service");
class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }
  CreateNotification = async (req, res) => {
    try {
      const { userId, type, content } = req.body;
      if (!userId || !type || !content) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const notification = await notificationService.createNotification({
        userId,
        type,
        content,
      });

      res.status(201).json({ notification });
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ error: "Failed to create notification" });
    }
  };

  GetUserNotification = async (req, res) => {
    try {
      const userId = req.user.id;
      const notifications = await notificationService.getNotificationsByUser(
        userId
      );

      res.status(200).json({ notifications });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  };
}

module.exports = NotificationController;
