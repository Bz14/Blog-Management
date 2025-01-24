const express = require("express");
const { forwardRequest } = require("../services/request_handler");
require("dotenv").config();

const route = express.Router();
const blogServiceUrl = process.env.BLOG_SERVICE_URL;

route.post("/blogs", (req, res) => forwardRequest(blogServiceUrl, req, res));
route.get("/blogs", (req, res) => forwardRequest(blogServiceUrl, req, res));
route.get("/blogs/:id", (req, res) => forwardRequest(blogServiceUrl, req, res));
route.get("/myblog", (req, res) => forwardRequest(blogServiceUrl, req, res));

module.exports = route;
