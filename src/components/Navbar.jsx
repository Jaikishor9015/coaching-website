import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const getStudent = () => {
    try {
      return JSON.parse(localStorage.getItem("studentData") || "null");
    } catch {
      return null;
    }
  };

  const [student, setStudent] = useState(getStudent);

  const closeMenu = () => setIsOpen(false);

  const logout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    setStudent(null);
    closeMenu();
    navigate("/student/login");
  };

  const navLinkClass = "text-gray-700 hover:text-blue-600 transition";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-blue-600"
        >
          EduCore
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {student ? (
            <>
              <Link to={`/notes/${student.className}`} className={navLinkClass}>
                Notes
              </Link>

              <Link
                to={`/test-papers/${student.className}`}
                className={navLinkClass}
              >
                Test Papers
              </Link>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {(student.name || student.username || "S")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {student.name || student.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    {student.className?.replace("-", " ")}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/#home" className={navLinkClass}>
                Home
              </a>
              <a href="/#about" className={navLinkClass}>
                About
              </a>
              <a href="/#courses" className={navLinkClass}>
                Courses
              </a>
              <a href="/#notes" className={navLinkClass}>
                Notes
              </a>
              <a href="/#tests" className={navLinkClass}>
                Tests
              </a>
              <a href="/#why-us" className={navLinkClass}>
                Why Us
              </a>

              <Link
                to="/student/login"
                className="border border-blue-600 text-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <a
                href="/#contact"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
              >
                Enquire Now
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-2xl"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-5">
          <div className="flex flex-col gap-5">
            {student ? (
              <>
                <p className="font-semibold text-gray-800">
                  {student.name || student.username}
                </p>
                <p className="text-sm text-gray-500">
                  {student.className?.replace("-", " ")}
                </p>

                <Link onClick={closeMenu} to={`/notes/${student.className}`}>
                  Notes
                </Link>

                <Link
                  onClick={closeMenu}
                  to={`/test-papers/${student.className}`}
                >
                  Test Papers
                </Link>

                <button
                  onClick={logout}
                  className="bg-red-50 text-red-600 px-5 py-3 rounded-lg text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a onClick={closeMenu} href="/#home">
                  Home
                </a>
                <a onClick={closeMenu} href="/#about">
                  About
                </a>
                <a onClick={closeMenu} href="/#courses">
                  Courses
                </a>
                <a onClick={closeMenu} href="/#notes">
                  Notes
                </a>
                <a onClick={closeMenu} href="/#tests">
                  Tests
                </a>
                <a onClick={closeMenu} href="/#why-us">
                  Why Us
                </a>

                <Link
                  onClick={closeMenu}
                  to="/student/login"
                  className="border border-blue-600 text-blue-600 px-5 py-3 rounded-lg text-center"
                >
                  Login
                </Link>

                <a
                  onClick={closeMenu}
                  href="/#contact"
                  className="bg-blue-600 text-white px-5 py-3 rounded-lg text-center"
                >
                  Enquire Now
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
