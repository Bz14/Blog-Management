const bcrypt = require("bcryptjs");
const VerificationEmail = require("../utils/verification_email");
const GenerateOtp = require("../utils/generateOtp");
const { GenerateToken } = require("../utils/generateToken");
const { initRabbitMQ, publishMessage } = require("../utils/rabbitmq");

let channel;
(async () => {
  channel = await initRabbitMQ();
})();

class AuthService {
  constructor(authRepo) {
    this.authRepo = authRepo;
  }

  Signup = async (name, email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const existingUser = await this.authRepo.GetUserByEmail(email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      const otp = GenerateOtp();
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.authRepo.Signup(name, email, hashedPassword, otp);

      const emailMessage = VerificationEmail(email, otp);
      const notificationEvent = {
        id: user._id,
        type: "email",
        message: emailMessage,
      };

      await publishMessage("notification_queue", notificationEvent);

      return "User registered. Confirmation email sent.";
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  Verify = async (email, otp) => {
    try {
      if (!email || !otp) {
        throw new Error("Email and OTP are required");
      }

      const user = await this.authRepo.GetUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.otp !== otp) {
        throw new Error("Invalid OTP");
      }

      await this.authRepo.Verify(email);
      return "User verified";
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  Login = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await this.authRepo.GetUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      }
      const token = GenerateToken(user._id);

      return token;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  GetUserProfile = async (id) => {
    try {
      const user = this.authRepo.GetUserById(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  UpdateUserProfile = async (id, name, bio) => {
    try {
      const message = this.authRepo.UpdateUserProfile(id, name, bio);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetSubscribers = async (id) => {
    try {
      const subscribers = this.authRepo.GetSubscribers(id);
      return subscribers;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetAuthor = async (id) => {
    try {
      const author = this.authRepo.GetAuthor(id);
      return author;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  SaveAuthor = async (userId, authorId) => {
    try {
      const message = this.authRepo.SaveAuthor(userId, authorId);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = AuthService;
