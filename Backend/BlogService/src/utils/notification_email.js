const NotificationEmail = (email) => {
  const emailMessage = {
    to: email,
    subject: "Your favorite blog needs your attention!",
    html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #7F57C4;">Welcome to Blog!</h2>
            <p>Hi there,</p>
            <p>Thank you for subscribing to my blogs.</p>
            <p style="font-size: 1.2em; font-weight: bold; color: #7F57C4;">
             I have just published a new blog. Check it out now!
            </p>
          </div>
        `,
  };
  return emailMessage;
};

module.exports = NotificationEmail;
