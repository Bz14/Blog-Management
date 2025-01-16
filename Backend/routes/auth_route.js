const route = require("express").Router();
const AuthController = require("../controllers/auth_controller");
const AuthRepo = require("../repository/auth_repo");
const AuthService = require("../service/auth_service");

const authRepo = new AuthRepo();
const authService = new AuthService(authRepo);
const authController = new AuthController(authService);

route.post("/signup", authController.Signup);

module.exports = route;
