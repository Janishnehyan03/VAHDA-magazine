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
    instagramProfile: {
      type: String,
    },
    linkedinProfile: {
      type: String,
    },
    others: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
