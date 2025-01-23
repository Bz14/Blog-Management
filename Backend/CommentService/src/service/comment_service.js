const { publishMessage } = require("../utils/rabbitmq");
class CommentService {
  constructor(commentRepo) {
    this.commentRepo = commentRepo;
  }

  AddComment = async ({ blogId, userId, content }) => {
    try {
      const comment = await this.commentRepo.AddComment({
        blogId,
        userId,
        content,
      });
      const notificationPayload = {
        type: "NEW_COMMENT",
        blogId,
        userId,
        content,
      };

      await publishMessage("notification_queue", notificationPayload);
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
