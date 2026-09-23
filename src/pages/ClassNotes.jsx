import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function ClassNotes() {
  const { className } = useParams();

  const subjects = [
    {
      name: "Mathematics",
      slug: "maths",
      description: "Concepts, formulas and chapter-wise mathematics notes.",
      icon: "📐",
    },
    {
      name: "Science",
      slug: "science",
      description: "Physics, Chemistry and Biology study material.",
      icon: "🔬",
    },
    {
      name: "English",
      slug: "english",
      description: "Grammar, literature and writing study material.",
      icon: "📖",
    },
    {
      name: "Social Science",
      slug: "social-science",
      description: "History, Geography, Civics and Economics notes.",
      icon: "🌍",
    },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back button */}
        <Link
          to="/#notes"
          className="inline-flex items-center text-blue-600 font-medium mb-8 hover:text-blue-800"
        >
          ← Back to Notes
        </Link>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Study Resources
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            {className} Notes
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Select a subject to access chapter-wise notes and study material for{" "}
            {className}.
          </p>
        </motion.div>

        {/* Subjects */}
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
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                {subject.icon}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-6">
                {subject.name}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                {subject.description}
              </p>

              <Link
                to={`/notes/${className}/${subject.slug}`}
                className="inline-flex items-center mt-6 text-blue-600 font-semibold text-sm hover:text-blue-800"
              >
                View Chapters
                <span className="ml-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClassNotes;
