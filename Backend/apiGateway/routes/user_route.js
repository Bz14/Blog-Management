const express = require("express");
const { forwardRequest } = require("../services/request_handler");

require("dotenv").config();

const router = express.Router();
const userServiceUrl = process.env.USER_SERVICE_URL;

router.post("/auth/signup", (req, res) => {
  console.log("called", userServiceUrl);
  forwardRequest(userServiceUrl, req, res);
});
router.post("/auth/login", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

router.get("/auth/verify", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

router.get("/auth/profile", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

router.put("/auth/profile", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

module.exports = router;
