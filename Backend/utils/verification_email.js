// make it to send email to user with otp for verification

const VerificationEmail = (email, otp) => {
  const emailMessage = {
    to: email,
    subject: "Verify your email",
    text: `Your OTP is ${otp}`,
  };
  return emailMessage;
};
