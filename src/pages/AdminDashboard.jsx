import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AdminDashboard() {
  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Admin Panel
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-4">
            Manage study notes and test papers from one place.
          </p>
        </motion.div>

        {/* Dashboard cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Upload Material */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg transition"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              📤
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Upload Material
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Upload study notes and test papers for students.
            </p>

            <Link
              to="/admin/upload"
              className="inline-flex items-center mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Upload Material →
            </Link>
          </motion.div>
          {/* Manage Notes */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg transition"
          >
            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
              📚
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Manage Notes
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              View and manage all uploaded study notes.
            </p>

            <Link
              to="/admin/notes"
              className="inline-flex items-center mt-6 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Manage Notes →
            </Link>
          </motion.div>
          {/* Manage Test Papers */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg transition"
          >
            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
              📝
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Manage Test Papers
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              View and manage chapter-wise and annual test papers.
            </p>

            <Link
              to="/admin/test-papers"
              className="inline-flex items-center mt-6 bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Manage Test Papers →
            </Link>
          </motion.div>
          {/* Website */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg transition"
          >
            <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              🌐
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              View Website
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Open the student-facing coaching website.
            </p>

            <Link
              to="/"
              className="inline-flex items-center mt-6 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Open Website →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
