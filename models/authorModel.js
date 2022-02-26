const mongoose = require("mongoose");
const authorSectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Authorsection = mongoose.model("Authorsection", authorSectionSchema);
module.exports = Authorsection;
