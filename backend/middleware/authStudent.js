const jwt = require("jsonwebtoken");

const protectStudent = (req, res, next) => {
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

    req.student = {
      id: decoded.studentId,
      className: decoded.className,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Your session is invalid or expired. Please log in again.",
    });
  }
};

module.exports = protectStudent;
