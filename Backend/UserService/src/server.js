const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoute = require("./routes/user_route");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the authentication service");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
