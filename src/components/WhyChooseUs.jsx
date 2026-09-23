function WhyChooseUs() {
  const features = [
    {
      number: "01",
      title: "Experienced Teachers",
      description:
        "Learn from teachers who focus on clear concepts and practical understanding.",
    },
    {
      number: "02",
      title: "Regular Tests",
      description:
        "Frequent assessments help students track progress and identify weak areas.",
    },
    {
      number: "03",
      title: "Quality Study Material",
      description:
        "Get structured notes, practice questions and exam-oriented resources.",
    },
    {
      number: "04",
      title: "Personal Attention",
      description:
        "Individual guidance helps students improve at their own pace.",
    },
    {
      number: "05",
      title: "Doubt Support",
      description:
        "Students can clarify their doubts and strengthen difficult concepts.",
    },
    {
      number: "06",
      title: "Focused Preparation",
      description:
        "A structured approach keeps learning consistent and goal-oriented.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Everything students need to improve
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed">
            We combine experienced guidance, regular practice and quality
            resources to create a better learning experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group p-7 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Number */}
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition">
                {feature.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mt-6">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed mt-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
