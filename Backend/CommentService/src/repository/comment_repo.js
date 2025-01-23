const Comment = require("../models/comment");

class CommentRepo {
  constructor() {}

  AddComment = async ({ blogId, userId, content }) => {
    try {
      const comment = await Comment.create({
        blogId,
        userId,
        content,
      });
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetCommentsByBlogId = async (blogId) => {
    try {
      const comments = await Comment.find({ blogId });
      return comments;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = CommentRepo;
