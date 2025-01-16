const User = require("../models/User");

class AuthRepository {
  GetUserByEmail = async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  Signup = async (email, password) => {
    try {
      const user = new User({ email, password });
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = AuthRepository;
