const Blog = require("../models/blog");

class BlogRepo {
  constructor() {}

  CreateBlog = async (authorId, image, title, content) => {
    try {
      const blog = new Blog({
        authorId,
        image,
        title,
        content,
      });
      await blog.save();
      return blog;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = BlogRepo;
