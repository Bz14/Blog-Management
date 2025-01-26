const User = require("../models/user");

class AuthRepository {
  GetUserByEmail = async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  Signup = async (name, email, password, otp) => {
    try {
      const user = new User({ name, email, password, otp });
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  Verify = async (email) => {
    try {
      await User.updateOne({ email }, { isVerified: true });
      return "User verified";
    } catch (error) {
      throw new Error(error);
    }
  };

  GetUserById = async (id) => {
    try {
      const user = await User.findOne({ _id: id });
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  UpdateUserProfile = async (id, name, bio) => {
    try {
      const user = await User.updateOne({ _id: id }, { name, bio });
      return "User updated";
    } catch (error) {
      throw new Error(error);
    }
  };

  GetSubscribers = async (id) => {
    try {
      const user = await User.findOne({ _id: id });
      return user.followers;
    } catch (error) {
      throw new Error(error);
    }
  };

  GetAuthor = async (id) => {
    try {
      const user = await User.findOne({ _id: id });
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  SaveAuthor = async (userId, authorId) => {
    console.log(userId, authorId);
    try {
      const user = await User.findOne({ _id: userId });
      const author = await User.findOne({ _id: authorId });
      user.blogs.push(author);
      await user.save();
      return "Author saved";
    } catch (error) {
      throw new Error(error);
    }
  };
  FollowAuthor = async (userId, authorId) => {
    try {
      const user = await User.findOne({ _id: userId });
      const author = await User.findOne({ _id: authorId });
      user.following.push(author._id);
      author.followers.push(user._id);
      await user.save();
      await author.save();
      return "You followed the author";
    } catch (error) {
      throw new Error(error);
    }
  };

  CommentOnBlog = async (id, authorId, blogId, comment) => {
    try {
      const user = await User.findOne({ _id: authorId });
      user.comments.push({
        id: id,
        blogId,
        blogId,
        comment: comment,
      });
      await user.save();
      await author.save();
      return "Comment added successfully";
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = AuthRepository;
