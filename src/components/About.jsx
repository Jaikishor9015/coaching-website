import { motion } from "framer-motion";
function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Education that builds confidence
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed">
            We believe every student can achieve more with the right guidance,
            consistent practice and a learning environment that encourages
            curiosity.
          </p>
        </div>

        {/* Main content */}
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white min-h-[420px] flex flex-col justify-between shadow-xl">
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wider">
                  Our Mission
                </p>

                <h3 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
                  Making quality education accessible to every student.
                </h3>

                <p className="text-blue-100 mt-5 leading-relaxed max-w-md">
                  We focus on strong fundamentals, consistent practice and
                  personal guidance so students can learn with confidence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10">
                <div>
                  <p className="text-4xl font-bold">10+</p>
                  <p className="text-blue-100 mt-1">Years of teaching</p>
                </div>

                <div>
                  <p className="text-4xl font-bold">5K+</p>
                  <p className="text-blue-100 mt-1">Students guided</p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <p className="text-sm text-gray-500">Our approach</p>

              <p className="font-bold text-gray-900 mt-1">
                Learn → Practice → Improve
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              A learning environment built around students
            </h3>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Our approach combines clear teaching, regular assessment and
              personalized guidance to help students make consistent progress.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-2xl">👨‍🏫</div>

                <h4 className="font-semibold text-gray-900 mt-3">
                  Experienced Teachers
                </h4>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Clear explanations focused on understanding concepts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-2xl">📝</div>

                <h4 className="font-semibold text-gray-900 mt-3">
                  Regular Assessment
                </h4>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Tests help students identify and improve weak areas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-2xl">🎯</div>

                <h4 className="font-semibold text-gray-900 mt-3">
                  Personal Attention
                </h4>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Guidance tailored to each student's learning needs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-2xl">📚</div>

                <h4 className="font-semibold text-gray-900 mt-3">
                  Quality Resources
                </h4>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Structured notes and practice material for preparation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
