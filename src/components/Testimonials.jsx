function Testimonials() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      className: "Class 10 Student",
      message:
        "The teachers explain difficult concepts in a very simple way. Regular tests helped me become more confident.",
    },
    {
      name: "Priya Verma",
      className: "Class 12 Student",
      message:
        "The study material and regular practice made my preparation much more organized.",
    },
    {
      name: "Rahul Mehta",
      className: "Parent",
      message:
        "We really appreciate the personal attention given to students and the regular progress updates.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            What our students say
          </h2>

          <p className="text-gray-600 mt-5">
            Hear from students and parents about their learning experience.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="text-yellow-500 text-lg">★★★★★</div>

              {/* Message */}
              <p className="text-gray-600 leading-relaxed mt-5">
                "{testimonial.message}"
              </p>

              {/* Person */}
              <div className="flex items-center gap-4 mt-7 pt-5 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {testimonial.className}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
