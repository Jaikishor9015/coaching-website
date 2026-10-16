const express = require("express");
const Note = require("../models/Note");
const protectAdmin = require("../middleware/authMiddleware");
const protectStudent = require("../middleware/authStudent");

const router = express.Router();

// Create a new note
router.post("/", protectAdmin, async (req, res) => {
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

// Get all notes for admin
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

// Update a note
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { className, subject, chapterNumber, title, description } = req.body;

    if (!className?.trim() || !subject?.trim() || !title?.trim()) {
      return res.status(400).json({
        message: "Class, subject and title are required.",
      });
    }

    const chapter = Number(chapterNumber);

    if (!Number.isInteger(chapter) || chapter < 1) {
      return res.status(400).json({
        message: "A valid chapter number is required.",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        className: className.trim().toLowerCase(),
        subject: subject.trim().toLowerCase(),
        chapterNumber: chapter,
        title: title.trim(),
        description: description || "",
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update note",
      error: error.message,
    });
  }
});

// Delete a note
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
});

// Get notes by class and subject — students only
router.get("/:className/:subject", protectStudent, async (req, res) => {
  try {
    const { className, subject } = req.params;

    // Students can access only their assigned class
    if (req.student.className !== className) {
      return res.status(403).json({
        message: "You can access notes for your assigned class only.",
      });
    }

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
