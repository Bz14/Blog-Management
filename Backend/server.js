const express = require("express");
const connectDB = require("./config/db");
const connectRabbitMQ = require("./utils/rabbitmq");
const authRoute = require("./routes/auth_route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);

connectDB();
connectRabbitMQ();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
