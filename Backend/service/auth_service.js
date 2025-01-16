const connectRabbitMQ = require("../utils/rabbitmq");
const bcrypt = require("bcryptjs");

let channel;
(async () => {
  channel = await connectRabbitMQ();
})();

class AuthService {
  constructor(authRepo) {
    this.authRepo = authRepo;
  }

  Signup = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await this.authRepo.GetUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authRepo.Signup(email, hashedPassword);
    return user;
  };
}

module.exports = AuthService;

const User = require("../models/User");
const sendEmail = require("../utils/emailService");
const connectRabbitMQ = require("../utils/rabbitmq");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Publish email message to RabbitMQ
    const emailMessage = {
      to: email,
      subject: "Confirm your email",
      text: "Thank you for registering. Please confirm your email.",
    };

    channel.assertQueue("email_queue", { durable: true });
    channel.sendToQueue(
      "email_queue",
      Buffer.from(JSON.stringify(emailMessage))
    );
    console.log("Email message sent to queue");

    res
      .status(201)
      .json({ message: "User registered. Confirmation email sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser };
