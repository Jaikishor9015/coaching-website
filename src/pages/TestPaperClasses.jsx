import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function TestPaperClasses() {
  const classes = [
    {
      name: "Class 6",
      slug: "class-6",
    },
    {
      name: "Class 7",
      slug: "class-7",
    },
    {
      name: "Class 8",
      slug: "class-8",
    },
    {
      name: "Class 9",
      slug: "class-9",
    },
    {
      name: "Class 10",
      slug: "class-10",
    },
    {
      name: "Class 11",
      slug: "class-11",
    },
    {
      name: "Class 12",
      slug: "class-12",
    },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
          >
            ← Home
          </Link>

          <a
            href="/#test-papers"
            className="inline-flex items-center text-gray-600 font-medium hover:text-gray-900"
          >
            Test Papers
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Practice Material
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Select Your Class
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Choose your class to find chapter-wise tests and annual examination
            papers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classes.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -7 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                {item.name.replace("Class ", "")}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-6">
                {item.name}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Chapter tests and annual examination papers.
              </p>

              <Link
                to={`/test-papers/${item.slug}`}
                className="inline-flex items-center mt-6 text-blue-600 font-semibold text-sm hover:text-blue-800"
              >
                View Subjects
                <span className="ml-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestPaperClasses;
