import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function TestPaperSubjects() {
  const { className } = useParams();

  const subjects = [
    {
      name: "Mathematics",
      slug: "maths",
      description: "Chapter-wise mathematics tests and annual papers.",
      icon: "📐",
    },
    {
      name: "Science",
      slug: "science",
      description: "Physics, Chemistry and Biology practice papers.",
      icon: "🔬",
    },
    {
      name: "English",
      slug: "english",
      description: "Grammar, literature and annual examination papers.",
      icon: "📖",
    },
    {
      name: "Social Science",
      slug: "social-science",
      description: "History, Geography, Civics and Economics papers.",
      icon: "🌍",
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

          <Link
            to="/test-papers"
            className="inline-flex items-center text-gray-600 font-medium hover:text-gray-900"
          >
            ← Classes
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            {className.replace("-", " ")}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 capitalize">
            Select Subject
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Choose a subject to view chapter-wise tests and annual examination
            papers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -7 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                {subject.icon}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-6">
                {subject.name}
              </h2>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                {subject.description}
              </p>

              <Link
                to={`/test-papers/${className}/${subject.slug}`}
                className="inline-flex items-center mt-6 text-blue-600 font-semibold text-sm hover:text-blue-800"
              >
                View Papers
                <span className="ml-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestPaperSubjects;
