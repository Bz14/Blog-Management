const route = require("express").Router();
const AuthController = require("../controllers/user_controller");
const AuthRepo = require("../repository/user_repo");
const AuthService = require("../service/user_service");
const AuthMiddleware = require("../middleware/userMiddleware");

const authRepo = new AuthRepo();
const authService = new AuthService(authRepo);
const authController = new AuthController(authService);

route.post("/signup", authController.Signup);
route.post("/verify", authController.Verify);
route.post("/login", authController.Login);
route.get("/validate", AuthMiddleware, authController.ValidateUser);
route.get("/profile", AuthMiddleware, authController.GetUserProfile);
route.put("/profile", AuthMiddleware, authController.UpdateUserProfile);
route.get("/:id/subscribers", authController.GetSubscribers);
route.get("/author/:id", authController.GetAuthor);
route.post("/save/:authorId", AuthMiddleware, authController.SaveAuthor);

module.exports = route;
