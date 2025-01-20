const route = require("express").Router();

const NotificationController = require("../controllers/notification_controller");
const NotificationRepo = require("../repository/notification_repo");
const NotificationService = require("../service/notification_service");

const notificationRepo = new NotificationRepo();
const notificationService = new NotificationService(notificationRepo);
const notificationController = new NotificationController(notificationService);

router.post("/notifications", notificationController.CreateNotification);
router.get("/notifications", notificationController.GetUserNotification);
