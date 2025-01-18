const jwt = require("jsonwebtoken");

require("dotenv").config();

const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const VerifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { GenerateToken, VerifyToken };
