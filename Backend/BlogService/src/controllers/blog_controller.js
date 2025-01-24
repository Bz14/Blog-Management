const { validateUserToken } = require("../utils/token_service");
class BlogController {
  constructor(blogService) {
    this.blogService = blogService;
  }

  CreateBlog = async (req, res) => {
    console.log(req.body);
    try {
      const { title, content } = req.body;
      const image = req.file;
      if (!title || !content || !image) {
        return res
          .status(400)
          .json({ error: "Title, content, and image are required." });
      }
      const token = req.token;
      const userId = await validateUserToken(token);
      if (!userId) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      const imagePath = `/uploads/${image.filename}`;

      const blog = await this.blogService.CreateBlog(
        userId,
        imagePath,
        title,
        content
      );
      res.status(201).json({ message: blog });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  GetBlogs = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const token = req.token;
      const userId = ValidateUserToken(token);
      if (!userId) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      const blogs = await this.blogService.GetBlogs(page, limit);
      res.status(200).json({ message: blogs });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  GetBlogById = async (req, res) => {
    try {
      const id = req.params;
      const token = req.token;
      const userId = ValidateUserToken(token);
      if (!userId) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      const blog = await this.blogService.GetBlogById(id);
      res.status(200).json({ message: blog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  GetMyBlogs = async (req, res) => {
    try {
      const token = req.token;
      const userId = ValidateUserToken(token);
      if (!userId) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      const blogs = await this.blogService.GetMyBlogs(userId);
      res.status(200).json({ message: blogs });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = BlogController;
