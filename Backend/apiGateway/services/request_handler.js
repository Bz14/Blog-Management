const axios = require("axios");

const forwardRequest = async (serviceUrl, req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.originalUrl}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Service Error:", error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Service unavailable" });
  }
};

module.exports = { forwardRequest };
