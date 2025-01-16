const express = require("express");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth_route");
const blogRoute = require("./routes/blog_route");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to the authentication service");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
