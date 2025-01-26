const bcrypt = require("bcryptjs");
const VerificationEmail = require("../utils/verification_email");
const FollowerEmail = require("../utils/follower_email");
const CommentEmail = require("../utils/comment_email");
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

  SaveAuthor = async (userId, blog) => {
    try {
      const message = this.authRepo.SaveAuthor(userId, blog);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  FollowAuthor = async (userId, authorId) => {
    try {
      const message = this.authRepo.FollowAuthor(userId, authorId);

      const author = await this.authRepo.GetUserById(authorId);
      const user = await this.authRepo.GetUserById(userId);

      const followMessage = FollowerEmail(author.email, user.name);
      const notificationEvent = {
        id: user._id,
        type: "email",
        message: followMessage,
      };

      await publishMessage("notification_queue", notificationEvent);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  CommentOnBlog = async (id, authorId, blogId, comment) => {
    try {
      const message = this.authRepo.CommentOnBlog(
        id,
        authorId,
        blogId,
        comment
      );

      const author = await this.authRepo.GetUserById(authorId);
      const user = await this.authRepo.GetUserById(id);

      const commentMessage = CommentEmail(author.email, user.name);
      const notificationEvent = {
        id: user._id,
        type: "email",
        message: commentMessage,
      };

      await publishMessage("notification_queue", notificationEvent);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetSavedBlogs = async (id) => {
    try {
      const blogs = this.authRepo.GetSavedBlogs(id);
      return blogs;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetComments = async (id) => {
    try {
      const comments = this.authRepo.GetComments(id);
      return comments;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = AuthService;
