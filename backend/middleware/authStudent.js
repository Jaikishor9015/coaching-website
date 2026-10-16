const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const protectStudent = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Student login required.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded.role !== "student" ||
      !decoded.studentId ||
      !decoded.className
    ) {
      return res.status(403).json({
        message: "Student access required.",
      });
    }

    // Recheck the current account in MongoDB.
    const student = await Student.findById(decoded.studentId);

    if (!student || !student.isActive) {
      return res.status(401).json({
        message: "Your account is inactive or no longer exists.",
      });
    }

    // Always use the student's current assigned class.
    req.student = {
      id: student._id.toString(),
      className: student.className,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Your session is invalid or expired. Please log in again.",
    });
  }
};

module.exports = protectStudent;
