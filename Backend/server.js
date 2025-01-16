const express = require("express");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth_route");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
