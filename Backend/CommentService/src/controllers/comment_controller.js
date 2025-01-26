const ValidateUserToken = require("../utils/token_service");
class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  CommentOnBlog = async (req, res) => {
    try {
      const { content } = req.body;
      const blogId = req.params.blogId;
      if (!blogId || !content) {
        return res.status(400).json({ error: "Invalid request" });
      }
      const token = req.token;
      const userId = ValidateUserToken(token);
      if (!userId) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      const result = await commentService.AddComment(userId, blogId, content);

      res
        .status(201)
        .json({ message: "Comment added successfully", comment: result });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  GetCommentsByBlogId = async (req, res) => {
    try {
      const token = req.token;
      const userId = ValidateUserToken(token);
      if (!userId) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      const blogId = req.params.blogId;
      if (!blogId) {
        return res.status(400).json({ error: "Invalid request" });
      }
      const comments = await commentService.GetCommentsByBlogId(blogId);
      res.status(200).json({ comments });
    } catch (error) {
      console.error("Error getting comments:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
}

module.exports = CommentController;
