const CommentEmail = (email, follower) => {
  const followMessage = {
    to: email,
    subject: "Someone commented on your blog",
    html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2 style="color: #7F57C4;">Welcome to Blog!</h2>
                <p>Hi there,</p>
                <p>${follower} added comments on your blog. Check it out.</p>
              </div>
            `,
  };
  return followMessage;
};

module.exports = CommentEmail;
