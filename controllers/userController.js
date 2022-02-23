const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = s = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({
        error: "Please provide email, password and name",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    user = await User.create(req.body);
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({
      user,
      token,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      user,
      token,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

// verify token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        error: "No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.checkLoggedIn = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({
        error: "No token provided",
      });
    }
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({
        error: "No token provided",
      });
    }
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
