const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", protectAdmin, async (req, res) => {
  try {
    const { name, username, password, className } = req.body;

    const allowedClasses = [
      "class-6",
      "class-7",
      "class-8",
      "class-9",
      "class-10",
      "class-11",
      "class-12",
    ];

    if (
      !name?.trim() ||
      !username?.trim() ||
      !password ||
      password.length < 8 ||
      !allowedClasses.includes(className)
    ) {
      return res.status(400).json({
        message:
          "Provide a name, username, valid class, and password of at least 8 characters.",
      });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const existingStudent = await Student.findOne({
      username: normalizedUsername,
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "This username is already taken.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = await Student.create({
      name: name.trim(),
      username: normalizedUsername,
      password: hashedPassword,
      className,
    });

    return res.status(201).json({
      message: "Student account created successfully.",
      student: {
        id: student._id,
        name: student.name,
        username: student.username,
        className: student.className,
      },
    });
  } catch (error) {
    console.error("Student registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "This username is already taken.",
      });
    }

    return res.status(500).json({
      message: "Unable to create student account.",
    });
  }
});

/* Get all students — admin only */
router.get("/", protectAdmin, async (req, res) => {
  try {
    const students = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.json({ students });
  } catch (error) {
    console.error("Fetch students error:", error);

    return res.status(500).json({
      message: "Unable to fetch students.",
    });
  }
});

// Student login
router.post("/login", async (req, res) => {
  try {
    const { username, password, className } = req.body;

    if (!username || !password || !className) {
      return res.status(400).json({
        message: "Username, password, and class are required.",
      });
    }

    const student = await Student.findOne({
      username: username.trim().toLowerCase(),
    });

    if (!student || !student.isActive) {
      return res.status(401).json({
        message: "Invalid login credentials.",
      });
    }

    const passwordMatches = await bcrypt.compare(password, student.password);

    if (!passwordMatches || student.className !== className) {
      return res.status(401).json({
        message: "Invalid login credentials or class.",
      });
    }

    const token = jwt.sign(
      {
        studentId: student._id.toString(),
        role: "student",
        className: student.className,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({
      message: "Login successful.",
      token,
      student: {
        id: student._id,
        name: student.name,
        username: student.username,
        className: student.className,
      },
    });
  } catch (error) {
    console.error("Student login error:", error);
    return res.status(500).json({
      message: "Unable to log in right now.",
    });
  }
});

module.exports = router;
