const { publishMessage } = require("../utils/rabbitmq");
class BlogService {
  constructor(blogRepo) {
    this.blogRepo = blogRepo;
  }

  CreateBlog = async (authorId, image, title, content) => {
    try {
      const blog = this.blogRepo.CreateBlog(authorID, image, title, content);
      const notificationMessage = {
        event: "blog_created",
        data: {
          blogId: blog._id,
          authorId: userId,
          title,
        },
      };
      await publishMessage("notification_queue", notificationMessage);
      return blog;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetBlogs = async (page, limit) => {
    try {
      return await this.blogRepo.GetBlogs(page, limit);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetBlogById = async (id) => {
    try {
      return await this.blogRepo.GetBlogById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  GetMyBlogs = async (authorId) => {
    try {
      return await this.blogRepo.GetMyBlogs(authorId);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = BlogService;
