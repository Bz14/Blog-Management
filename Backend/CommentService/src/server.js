const express = require("express");
const connectDB = require("./config/db");
const TokenMiddleware = require("./middleware/tokenMiddleware");

const cors = require("cors");
const commentRoute = require("./routes/comment_route");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", TokenMiddleware, commentRoute);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the blog service");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
