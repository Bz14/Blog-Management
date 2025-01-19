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
}

module.exports = BlogService;
