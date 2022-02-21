const Author = require("../models/authorModel");

exports.createAuthor = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Please provide author name",
    });
  }
  try {
    const author = await Author.create(req.body);
    res.status(200).json({
      author,
      success: true,
    });
  } catch (error) {
    if(error.code === 11000) {
      return res.status(400).json({
        message: `Author with name ${req.body.name} already exists`,
      });
    }
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });
    res.status(200).json({
      authors,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.status(200).json({
      author,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.updateAuthorById = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      author,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.deleteAuthorById = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({
      author,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
