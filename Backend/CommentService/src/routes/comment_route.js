const route = require("express").Router();

const CommentController = require("../controllers/comment_controller");
const CommentRepo = require("../repository/comment_repo");
const CommentService = require("../service/comment_service")c;

const commentRepo = new CommentRepo();
const commentService = new CommentService(commentRepo);
const commentController = new CommentController(commentService);

route.post("/comment/:blogId", commentController.CommentOnBlog);
route.get("/comments/:blogId", commentController.GetCommentsByBlogId);

module.exports = route;
