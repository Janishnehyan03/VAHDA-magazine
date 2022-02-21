const Blog = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.content ||
    !req.body.category ||
    !req.body.author ||
    !req.body.image
  ) {
    return res.status(400).json({
      message: "Please provide title, content, category, author and image",
    });
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
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    let query = {};
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .populate("author", "name")
      .populate("category", "name");
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
    const blog = await Blog.findById(req.params.id);
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
