const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: [true, "This title already exists"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    hashtags: [
      {
        type: String,
        maxlength: [3, "Hashtag cannot be more than 3 characters"],
      },
    ],
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
