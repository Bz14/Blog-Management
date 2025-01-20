const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const notificationRoute = require("./routes/notification_route");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", notificationRoute);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the notification service");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
