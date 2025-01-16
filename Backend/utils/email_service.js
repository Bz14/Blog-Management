const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async (emailMessage) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    port: 465,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail(emailMessage);
};

module.exports = sendEmail;
