const { initRabbitMQ, publishMessage } = require("../utils/rabbitmq");
const { getSubscribersForUser } = require("../utils/get_subscriber");
let channel;
(async () => {
  channel = await initRabbitMQ();
})();
class BlogService {
  constructor(blogRepo) {
    this.blogRepo = blogRepo;
  }

  CreateBlog = async (authorId, image, title, content) => {
    try {
      const blog = this.blogRepo.CreateBlog(authorId, image, title, content);
      const subscribers = await getSubscribersForUser(authorId);
      const notifications = subscribers.map((subscriberId) => ({
        event: "blog_created",
        data: {
          blogId: blog._id,
          authorId,
          title,
          subscriberId,
        },
      }));
      for (const notification of notifications) {
        await publishMessage("notification_queue", notification);
      }
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
