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
console.log(__dirname);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", TokenMiddleware, blogRoute);

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the blog service", __dirname });
  // res.send("Welcome to the blog service", __dirname);
});

const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log("Server is running on port 4002");
});
