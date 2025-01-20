const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./routes/user_route");
// const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
// app.use("/api", blogRoutes);

module.exports = app;
