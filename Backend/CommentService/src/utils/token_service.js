const axios = require("axios");

const validateUserToken = async (token) => {
  try {
    const response = await axios.get(
      "http://UserService/api/v1/auth/validate",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.user;
  } catch (error) {
    console.error(
      "Error validating user token:",
      error.response?.data || error.message
    );
    return null;
  }
};

module.exports = { validateUserToken };
