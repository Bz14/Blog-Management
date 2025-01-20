const express = require("express");
const { forwardRequest } = require("../services/requestHandler");
const authenticate = require("../middleware/authenticate");

const router = express.Router();
const blogServiceUrl = process.env.BLOG_SERVICE_URL;

router.post("/blogs", authenticate, (req, res) =>
  forwardRequest(blogServiceUrl, req, res)
);
router.get("/blogs", (req, res) => forwardRequest(blogServiceUrl, req, res));
router.get("/blogs/:id", (req, res) =>
  forwardRequest(blogServiceUrl, req, res)
);

module.exports = router;
