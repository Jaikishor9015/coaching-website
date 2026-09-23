function ContactCTA() {
  return (
    <section id="contact" className="py-24 bg-blue-600">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-blue-100 font-semibold uppercase tracking-wider text-sm">
          Start Learning Today
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
          Ready to take the next step?
        </h2>

        <p className="text-blue-100 max-w-2xl mx-auto mt-5 leading-relaxed">
          Get in touch with us to learn more about our courses, study material
          and admission process.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="tel:+918901205663"
            className="bg-white text-blue-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            📞 Call Us
          </a>

          <a
            href="https://wa.me/918901205663"
            className="border border-white text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
