const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Note = require("../models/Note");
const TestPaper = require("../models/TestPaper");

const protectAdmin = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// ==========================================
// TEMPORARY FILE STORAGE
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempFolder = path.join("public", "notes", "temp");

    fs.mkdirSync(tempFolder, {
      recursive: true,
    });

    cb(null, tempFolder);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ==========================================
// PDF FILTER
// ==========================================

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
  },
});

// ==========================================
// UPLOAD STUDY NOTE
// ==========================================

router.post(
  "/",
  protectAdmin,
  upload.single("pdf"),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No PDF file uploaded",
        });
      }

      const { className, subject, chapterNumber, title, description } =
        req.body;

      // Check duplicate chapter
      const existingNote = await Note.findOne({
        className: className.trim().toLowerCase(),

        subject: subject.trim().toLowerCase(),

        chapterNumber: Number(chapterNumber),
      });

      if (existingNote) {
        return res.status(409).json({
          message: "This chapter already exists for this class and subject.",
        });
      }

      // Upload PDF to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",

        folder: `educore/notes/${className}/${subject}`,

        public_id: `chapter-${chapterNumber}`,
      });

      const pdfUrl = uploadResult.secure_url;

      // Delete temporary file
      fs.unlinkSync(req.file.path);

      // Save note
      const note = await Note.create({
        className: className.trim().toLowerCase(),

        subject: subject.trim().toLowerCase(),

        chapterNumber: Number(chapterNumber),

        title,

        description,

        pdfUrl,
      });

      res.status(201).json({
        message: "PDF and note saved successfully",

        note,
      });
    } catch (error) {
      console.error(error);

      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        message: "Failed to save PDF and note",

        error: error.message,
      });
    }
  },
);

// ==========================================
// UPLOAD TEST PAPER
// ==========================================

router.post(
  "/test-paper",
  protectAdmin,
  upload.single("pdf"),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No PDF file uploaded",
        });
      }

      const {
        className,
        subject,
        type,
        chapterNumber,
        title,
        description,
        year,
      } = req.body;

      // Validate paper type
      if (type !== "chapter" && type !== "annual") {
        return res.status(400).json({
          message: "Invalid test paper type",
        });
      }

      // Chapter papers require chapter number
      if (type === "chapter") {
        const chapter = Number(chapterNumber);

        if (!Number.isInteger(chapter) || chapter < 1) {
          return res.status(400).json({
            message: "A valid chapter number is required.",
          });
        }
      }

      const paperYear = Number(year);

      if (
        !Number.isInteger(paperYear) ||
        paperYear < 2000 ||
        paperYear > 2100
      ) {
        return res.status(400).json({
          message: "A valid year between 2000 and 2100 is required.",
        });
      }

      if (!title || !title.trim()) {
        return res.status(400).json({
          message: "Test paper title is required.",
        });
      }
      // Upload PDF to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",

        folder: `educore/test-papers/${className}/${subject}/${type}`,

        public_id: `paper-${Date.now()}`,
      });

      const pdfUrl = uploadResult.secure_url;

      // Delete temporary file
      fs.unlinkSync(req.file.path);

      // Save test paper
      const testPaper = await TestPaper.create({
        className: className.trim().toLowerCase(),

        subject: subject.trim().toLowerCase(),

        type,

        chapterNumber: type === "chapter" ? Number(chapterNumber) : null,

        title: title.trim(),

        description,

        pdfUrl,

        year: paperYear,
      });

      res.status(201).json({
        message: "Test paper uploaded successfully",

        testPaper,
      });
    } catch (error) {
      console.error(error);

      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        message: "Failed to upload test paper",

        error: error.message,
      });
    }
  },
);

module.exports = router;
