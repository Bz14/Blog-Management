const axios = require("axios");

const getSubscribersForUser = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4001/api/v1/auth/${id}/subscribers`
    );
    return response.data.subscribers;
  } catch (error) {
    throw new Error("Failed to fetch subscribers");
  }
};

module.exports = { getSubscribersForUser };
