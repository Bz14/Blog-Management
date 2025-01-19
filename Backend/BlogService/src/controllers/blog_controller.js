const ValidateUserToken = require("../utils/token_service");
class BlogController {
  constructor(blogService) {
    this.blogService = blogService;
  }

  CreateBlog = async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file;
      if (!title || !content || !imageFile) {
        return res
          .status(400)
          .json({ error: "Title, content, and image are required." });
      }
      const token = req.token;
      const userId = ValidateUserToken(token);
      if (!userId) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      const imagePath = `/uploads/${image.filename}`;

      const blog = await this.blogService.CreateBlog({
        authorId: userId,
        image: imagePath,
        title,
        content,
      });
      res.status(201).json({ message: blog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = BlogController;
