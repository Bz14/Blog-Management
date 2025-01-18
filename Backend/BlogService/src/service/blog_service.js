class BlogService {
  constructor(blogRepo) {
    this.blogRepo = blogRepo;
  }

  CreateBlog = (author, image, title, content) => {
    try {
      const blog = this.blogRepo.CreateBlog(author, image, title, content);
      return "Blog created";
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = BlogService;
