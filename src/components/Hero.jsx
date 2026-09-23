import { motion } from "framer-motion";
import studentsImage from "../assets/students-learning.png";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen pt-32 pb-20 `bg-gradient-to-br` from-blue-50 via-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ✓ Trusted by 5,000+ Students
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Learn Better.
              <span className="text-blue-600"> Score Higher.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Expert guidance, structured learning and regular practice to help
              students build strong concepts and achieve their academic goals.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.a
                href="#courses"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Explore Courses →
              </motion.a>

              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 bg-white text-gray-700 px-6 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                Know About Us
              </motion.a>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-10 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">10+</h3>
                <p className="text-gray-500 text-sm mt-1">Years Experience</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">5K+</h3>
                <p className="text-gray-500 text-sm mt-1">Students</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">95%</h3>
                <p className="text-gray-500 text-sm mt-1">Success Rate</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={studentsImage}
                alt="Students learning together"
                className="w-full `h-500px` object-cover"
              />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
            >
              <p className="text-sm text-gray-500">Learning made easier</p>

              <p className="text-xl font-bold text-gray-900 mt-1">
                📚 Learn • Practice • Improve
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
