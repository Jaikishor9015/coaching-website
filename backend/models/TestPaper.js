const mongoose = require("mongoose");

const testPaperSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["chapter", "annual"],
      required: true,
    },

    chapterNumber: {
      type: Number,
      default: null,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TestPaper", testPaperSchema);
