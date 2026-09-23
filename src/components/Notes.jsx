import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Notes() {
  const classes = [
    {
      className: "Class 6",
      description: "Study notes and learning resources for Class 6.",
    },
    {
      className: "Class 7",
      description: "Study notes and learning resources for Class 7.",
    },
    {
      className: "Class 8",
      description: "Study notes and learning resources for Class 8.",
    },
    {
      className: "Class 9",
      description: "Study notes and learning resources for Class 9.",
    },
    {
      className: "Class 10",
      description: "Study notes and learning resources for Class 10.",
    },
    {
      className: "Class 11",
      description: "Study notes and learning resources for Class 11.",
    },
    {
      className: "Class 12",
      description: "Study notes and learning resources for Class 12.",
    },
  ];

  return (
    <section id="notes" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Study Resources
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Notes & Study Material
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed">
            Select your class to access subject-wise notes and chapter-wise
            study material.
          </p>
        </motion.div>

        {/* Class Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((item, index) => (
            <motion.div
              key={item.className}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -7 }}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                📚
              </div>

              {/* Class */}
              <h3 className="text-2xl font-bold text-gray-900 mt-6">
                {item.className}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                {item.description}
              </p>

              {/* View */}
              <Link
                to={`/notes/${item.className.toLowerCase().replace(" ", "-")}`}
                className="inline-flex items-center mt-6 text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition"
              >
                View Notes
                <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Notes;
