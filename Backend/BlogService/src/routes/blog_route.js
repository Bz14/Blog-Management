const route = require("express").Router();
const upload = require("../config/multer");

const BlogController = require("../controllers/blog_controller");
const BlogRepo = require("../repository/blog_repo");
const BlogService = require("../service/blog_service");

const blogRepo = new BlogRepo();
const blogService = new BlogService(blogRepo);
const blogController = new BlogController(blogService);

route.post("/blogs", upload.single("image"), blogController.CreateBlog);
