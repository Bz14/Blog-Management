const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user_route");
const blogRoutes = require("./routes/blog_route");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
