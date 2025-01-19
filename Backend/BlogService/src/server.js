const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const TokenMiddleware = require("./middleware/tokenMiddleware");

const cors = require("cors");
const blogRoute = require("./routes/blog_route");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", TokenMiddleware, blogRoute);

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to the blog service");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
