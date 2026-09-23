const express = require("express");
const TestPaper = require("../models/TestPaper");
const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CREATE TEST PAPER
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      className,
      subject,
      type,
      chapterNumber,
      title,
      description,
      pdfUrl,
      year,
    } = req.body;

    const testPaper = await TestPaper.create({
      className,

      subject,

      type,

      chapterNumber: type === "chapter" ? Number(chapterNumber) : null,

      title,

      description,

      pdfUrl,

      year: Number(year),
    });

    res.status(201).json(testPaper);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create test paper",

      error: error.message,
    });
  }
});

// ==========================================
// GET TEST PAPERS
router.get("/admin/all", protectAdmin, async (req, res) => {
  try {
    const testPapers = await TestPaper.find().sort({
      className: 1,
      subject: 1,
      type: 1,
      chapterNumber: 1,
      year: -1,
    });

    res.json(testPapers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch all test papers",
      error: error.message,
    });
  }
});
// ==========================================
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPaper = await TestPaper.findByIdAndDelete(id);

    if (!deletedPaper) {
      return res.status(404).json({
        message: "Test paper not found",
      });
    }

    res.json({
      message: "Test paper deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete test paper",
      error: error.message,
    });
  }
});
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      className,
      subject,
      type,
      chapterNumber,
      title,
      description,
      year,
    } = req.body;

    if (!className || !subject || !type || !title) {
      return res.status(400).json({
        message: "Class, subject, type and title are required.",
      });
    }

    if (!["chapter", "annual"].includes(type)) {
      return res.status(400).json({
        message: "Invalid test paper type.",
      });
    }

    if (type === "chapter") {
      const chapter = Number(chapterNumber);

      if (!Number.isInteger(chapter) || chapter < 1) {
        return res.status(400).json({
          message: "A valid chapter number is required.",
        });
      }
    }

    const paperYear = Number(year);

    if (!Number.isInteger(paperYear) || paperYear < 2000 || paperYear > 2100) {
      return res.status(400).json({
        message: "A valid year between 2000 and 2100 is required.",
      });
    }

    const updatedPaper = await TestPaper.findByIdAndUpdate(
      id,
      {
        className: className.trim().toLowerCase(),
        subject: subject.trim().toLowerCase(),
        type,
        chapterNumber: type === "chapter" ? Number(chapterNumber) : null,
        title: title.trim(),
        description: description || "",
        year: paperYear,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPaper) {
      return res.status(404).json({
        message: "Test paper not found",
      });
    }

    res.json({
      message: "Test paper updated successfully",
      testPaper: updatedPaper,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update test paper",
      error: error.message,
    });
  }
});

router.get(
  "/:className/:subject",

  async (req, res) => {
    try {
      const { className, subject } = req.params;

      const testPapers = await TestPaper.aggregate([
        {
          $match: {
            className,
            subject,
          },
        },

        {
          $addFields: {
            typeOrder: {
              $cond: [
                {
                  $eq: ["$type", "chapter"],
                },
                1,
                2,
              ],
            },
          },
        },

        {
          $sort: {
            typeOrder: 1,
            chapterNumber: 1,
            year: -1,
          },
        },

        {
          $project: {
            typeOrder: 0,
          },
        },
      ]);

      res.json(testPapers);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch test papers",

        error: error.message,
      });
    }
  },
);

module.exports = router;
