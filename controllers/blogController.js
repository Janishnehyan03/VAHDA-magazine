const Blog = require("../models/blogModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createBlog = async (req, res) => {
  let message;
  if (!req.body.title) {
    message = "Title is required";
  } else if (!req.body.content) {
    message = "Content is required";
  } else if (!req.body.category) {
  } else if (!req.body.authorDetails) {
    message = "Author Details is required";
  } else if (!req.body.category) {
    message = "Category is required";
  } else if (!req.body.author) {
    message = "Please provide author";
  } else if (!req.body.image) {
    message = "Please provide image";
  }
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({
      blog,
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: `Blog with title ${req.body.title} already exists`,
      });
    }
    res.status(400).json({
      error,
      success: false,
      message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    let query = req.query;
    let limit = req.query.limit;
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .limit(limit)
      .skip(query.skip)

    res.status(200).json({
      results: blogs.length,
      blogs,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name image description")
      .populate("category", "name");
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.updateBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({
      category: ObjectId(req.params.id),
    }).populate("author", "name");
    res.status(200).json({
      blogs,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
