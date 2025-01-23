const route = require("express").Router();

const NotificationController = require("../controllers/notification_controller");
const NotificationRepo = require("../repository/notification_repo");
const NotificationService = require("../service/notifcation_service");

const notificationRepo = new NotificationRepo();
const notificationService = new NotificationService(notificationRepo);
const notificationController = new NotificationController(notificationService);

route.post("/notifications", notificationController.CreateNotification);
route.get("/notifications", notificationController.GetUserNotification);

module.exports = route;
