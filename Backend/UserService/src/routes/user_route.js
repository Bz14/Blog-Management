const route = require("express").Router();
const AuthController = require("../controllers/user_controller");
const AuthRepo = require("../repository/user_repo");
const AuthService = require("../service/user_service");

const authRepo = new AuthRepo();
const authService = new AuthService(authRepo);
const authController = new AuthController(authService);

route.post("/signup", authController.Signup);
route.post("/verify", authController.Verify);
route.post("/login", authController.Login);

module.exports = route;
