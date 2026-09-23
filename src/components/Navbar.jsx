import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="text-2xl font-bold text-blue-600"
        >
          EduCore
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          <a
            href="#home"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </a>

          <a
            href="#courses"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Courses
          </a>

          <a
            href="#notes"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Notes
          </a>

          <a
            href="#tests"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Tests
          </a>

          <a
            href="#why-us"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Why Us
          </a>

          <a
            href="#contact"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Enquire Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-2xl"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-5">
          <div className="flex flex-col gap-5">
            <a onClick={closeMenu} href="#home">
              Home
            </a>

            <a onClick={closeMenu} href="#about">
              About
            </a>

            <a onClick={closeMenu} href="#courses">
              Courses
            </a>

            <a onClick={closeMenu} href="#notes">
              Notes
            </a>

            <a onClick={closeMenu} href="#tests">
              Tests
            </a>

            <a onClick={closeMenu} href="#why-us">
              Why Us
            </a>

            <a
              onClick={closeMenu}
              href="#contact"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg text-center"
            >
              Enquire Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
