const mongoose = require("mongoose");

const router = require("express").Router();
const videoSchema = mongoose.Schema(
  {
    title: String,
    videoId: String,
  },
  {
    timestamps: true,
  }
);
const Video = mongoose.model("Video", videoSchema);

router.post("/", async (req, res) => {
  try {
    let video = await Video.create(req.body);
    res.status(201).json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let videos = await Video.find();
    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let video = await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
