const express = require("express");
const { forwardRequest } = require("../services/request_handler");

require("dotenv").config();

const router = express.Router();
const userServiceUrl = process.env.USER_SERVICE_URL;

router.post("/api/v1/auth/signup", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);
router.post("/api/v1/auth/login", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

router.get("/api/v1/auth/verify", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

router.get("/api/v1/auth/profile", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

router.put("/api/v1/auth/profile", (req, res) =>
  forwardRequest(userServiceUrl, req, res)
);

module.exports = router;
