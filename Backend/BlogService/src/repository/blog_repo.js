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

  GetBlogs = async (page, limit) => {
    try {
      const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      const totalBlogs = await Blog.countDocuments();
      return {
        total: totalBlogs,
        page: parseInt(page),
        limit: parseInt(limit),
        blogs,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetBlogById = async (id) => {
    try {
      const blog = await Blog.findOne({ _id: id.id });
      return blog;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  GetMyBlogs = async (authorId) => {
    try {
      const blogs = await Blog.find({ authorId });
      console.log(authorId, blogs);
      return blogs;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = BlogRepo;
