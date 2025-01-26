const CommentEmail = (email) => {
  const commentMessage = {
    to: email,
    subject: "Someone commented on your blog",
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
              <h2 style="color: #7F57C4;">Welcome to Blog!</h2>
              <p>Hi there,</p>
              <p>Someone added comments on your blog check it out.</p>
            </div>
          `,
  };
  return commentMessage;
};

module.exports = CommentEmail;
