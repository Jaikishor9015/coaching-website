const express = require("express");
const Note = require("../models/Note");
const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();
// Create a new note
router.post("/", async (req, res) => {
  try {
    const { className, subject, chapterNumber, title, description, pdfUrl } =
      req.body;

    const note = await Note.create({
      className,
      subject,
      chapterNumber,
      title,
      description,
      pdfUrl,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});

router.get("/admin/all", protectAdmin, async (req, res) => {
  try {
    const notes = await Note.find().sort({
      className: 1,
      subject: 1,
      chapterNumber: 1,
    });

    res.json(notes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch all notes",
      error: error.message,
    });
  }
});
// Get notes by class and subject
router.get("/:className/:subject", async (req, res) => {
  try {
    const { className, subject } = req.params;

    const notes = await Note.find({
      className,
      subject,
    }).sort({ chapterNumber: 1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

module.exports = router;
