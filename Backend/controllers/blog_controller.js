class BlogController {
  constructor(blogService) {
    this.blogService = blogService;
  }

  CreateBlog = async (req, res) => {
    try {
      const { author, title, content } = req.body;
      const image = req.file;
      const message = await this.blogService.CreateBlog(
        author,
        image,
        title,
        content
      );
      res.status(201).json({ message: message });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = BlogController;
