import { motion } from "framer-motion";

function Courses() {
  const courses = [
    {
      number: "01",
      title: "Classes 6–8",
      description:
        "Build strong fundamentals and develop a clear understanding of core subjects.",
      subjects: "Maths • Science • English",
      tag: "Foundation",
    },
    {
      number: "02",
      title: "Classes 9–10",
      description:
        "Concept-focused learning with regular tests, revision and exam preparation.",
      subjects: "Maths • Science • Social Science",
      tag: "Board Preparation",
    },
    {
      number: "03",
      title: "Classes 11–12",
      description:
        "Structured academic preparation designed around senior-secondary subjects.",
      subjects: "Physics • Chemistry • Maths • Biology",
      tag: "Senior Classes",
    },
    {
      number: "04",
      title: "Competitive Exams",
      description:
        "Focused preparation with practice tests and exam-oriented study material.",
      subjects: "SSC • Banking • Government Exams",
      tag: "Exam Preparation",
    },
  ];

  return (
    <section id="courses" className="py-24 bg-gray-50">
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
            Our Courses
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Learning paths for every stage
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed">
            Choose a structured learning program designed to help students
            understand concepts, practice regularly and make steady progress.
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -7 }}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {course.number}
                </span>

                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {course.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mt-7">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                {course.description}
              </p>

              {/* Subjects */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Subjects
                </p>

                <p className="text-sm font-medium text-gray-700 mt-2 leading-relaxed">
                  {course.subjects}
                </p>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="inline-flex items-center mt-6 text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition"
              >
                Enquire about course
                <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
