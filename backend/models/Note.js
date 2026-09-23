const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    chapterNumber: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
  },
);

noteSchema.index(
  {
    className: 1,
    subject: 1,
    chapterNumber: 1,
  },
  {
    unique: true,
  },
);
module.exports = mongoose.model("Note", noteSchema);
