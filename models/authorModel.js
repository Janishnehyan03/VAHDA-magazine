const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "This author already exists"],
      lowercase: true,
      trim: true,
    },
    facebookProfile: {
      type: String,
    },
    twitterProfile: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      default: "https://i.imgur.com/X2J5Z5J.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
