const AuthorSection = require("../models/authorModel");

exports.createAuthorSection = async (req, res) => {
  try {
    let authorSection = await AuthorSection.create(req.body);
    res.status(200).json({
      status: "success",
      authorSection,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.getAuthorSection = async (req, res) => {
  try {
    let authorSection = await AuthorSection.find();
    res.status(200).json({
      status: "success",
      authorSection,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.deleteAuthorSection = async (req, res) => {
  try {
    let authorSection = await AuthorSection.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      authorSection,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
