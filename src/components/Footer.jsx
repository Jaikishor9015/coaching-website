function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="text-2xl font-bold text-white hover:text-blue-400 transition"
            >
              EduCore
            </a>

            <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
              Helping students learn better, build strong concepts and achieve
              their academic goals.
            </p>

            <a
              href="#contact"
              className="inline-block mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Enquire Now →
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-3 mt-4">
              <a href="#home" className="hover:text-white transition">
                Home
              </a>

              <a href="#about" className="hover:text-white transition">
                About
              </a>

              <a href="#courses" className="hover:text-white transition">
                Courses
              </a>

              <a href="#notes" className="hover:text-white transition">
                Notes
              </a>

              <a href="#tests" className="hover:text-white transition">
                Test Papers
              </a>

              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold">Contact Us</h3>

            <div className="mt-4 space-y-3 text-gray-400">
              <a
                href="tel:+918901205663"
                className="block hover:text-white transition"
              >
                📞 +91 89012 05663
              </a>

              <a
                href="mailto:info@educore.com"
                className="block hover:text-white transition"
              >
                ✉️ info@educore.com
              </a>

              <p>📍 New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-gray-500">
          <p>© 2026 EduCore. All rights reserved.</p>

          <p>Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
