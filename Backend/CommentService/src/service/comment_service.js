const { initRabbitMQ, publishMessage } = require("../utils/rabbitmq");
const CommentEmail = require("../utils/comment_email");

let channel;
(async () => {
  channel = await initRabbitMQ();
})();

class CommentService {
  constructor(commentRepo) {
    this.commentRepo = commentRepo;
  }

  AddComment = async (userId, blogId, content) => {
    try {
      const comment = await this.commentRepo.AddComment(
        userId,
        blogId,
        content
      );

      const commentMessage = CommentEmail(email, otp);
      const notificationEvent = {
        id: user._id,
        type: "email",
        message: emailMessage,
      };

      await publishMessage("notification_queue", notificationEvent);
      return comment;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };
  GetCommentsByBlogId = async (blogId) => {
    try {
      const comments = await this.commentRepo.GetCommentsByBlogId(blogId);
      return comments;
    } catch (error) {
      console.error("Error getting comments:", error);
      throw error;
    }
  };
}

module.exports = CommentService;
