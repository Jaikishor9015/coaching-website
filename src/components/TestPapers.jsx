import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function TestPapers() {
  const classes = [
    "class-6",
    "class-7",
    "class-8",
    "class-9",
    "class-10",
    "class-11",
    "class-12",
  ];

  return (
    <section id="test-papers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Practice Material
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Test Papers
          </h2>

          <p className="text-gray-600 mt-4">
            Practice with chapter-wise tests and annual examination papers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {classes.map((className, index) => {
            const classNumber = className.replace("class-", "");

            return (
              <motion.div
                key={className}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -7 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {classNumber}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-5">
                  Class {classNumber}
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Chapter-wise tests and annual examination papers.
                </p>

                <Link
                  to={`/test-papers/${className}`}
                  className="inline-flex items-center mt-5 text-blue-600 font-semibold text-sm hover:text-blue-800"
                >
                  View Test Papers
                  <span className="ml-1">→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TestPapers;
