const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: null,
  },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1621292902/blank-profile-picture-973460_640_izvzjz.png",
  },
  otp: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
