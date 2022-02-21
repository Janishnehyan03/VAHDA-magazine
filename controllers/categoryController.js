const Blog = require("../models/blogModel");
const Category = require("../models/categoryModel");

exports.createCategory = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Please provide category name",
    });
  }
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      category,
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: `Category with name ${req.body.name} already exists`,
      });
    }
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      categories,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      category,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.updateCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      category,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      category,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.getAllBlogsByCategoryId = async (req, res) => {
  try {
    let query = {};
    query.category = req.params.id;
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
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
