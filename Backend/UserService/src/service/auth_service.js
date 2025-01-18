const connectRabbitMQ = require("../utils/rabbitmq");
const bcrypt = require("bcryptjs");
const VerificationEmail = require("../utils/verification_email");
const GenerateOtp = require("../utils/generateOtp");
const { GenerateToken } = require("../utils/generateToken");

let channel;
(async () => {
  channel = await connectRabbitMQ();
})();

class AuthService {
  constructor(authRepo) {
    this.authRepo = authRepo;
  }

  Signup = async (email, password) => {
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
      const user = await this.authRepo.Signup(email, hashedPassword, otp);

      const emailMessage = VerificationEmail(email, otp);
      channel.assertQueue("email_queue", { durable: true });
      channel.sendToQueue(
        "email_queue",
        Buffer.from(JSON.stringify(emailMessage))
      );
      console.log("Email message sent to queue");
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
}

module.exports = AuthService;
