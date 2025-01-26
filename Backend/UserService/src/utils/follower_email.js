const FollowerEmail = (email, follower) => {
  const followMessage = {
    to: email,
    subject: "Someone followed you",
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
              <h2 style="color: #7F57C4;">Welcome to Blog!</h2>
              <p>Hi there,</p>
              <p>${follower} started following you. Keep in touch with them.</p>
            </div>
          `,
  };
  return followMessage;
};

module.exports = FollowerEmail;
