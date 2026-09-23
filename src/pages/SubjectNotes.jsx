import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function SubjectNotes() {
  const { className, subject } = useParams();

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const subjectName = subject
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/notes/${className}/${subject}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();

        setChapters(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [className, subject]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <Link
          to={`/notes/${className}`}
          className="inline-flex items-center text-blue-600 font-medium mb-8 hover:text-blue-800"
        >
          ← Back to Subjects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            {className.replace("-", " ")}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 capitalize">
            {subjectName} Notes
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">
            Select a chapter below to access the study material and PDF notes.
          </p>
        </motion.div>

        {loading && <p className="text-gray-500">Loading notes...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && chapters.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No notes available yet
            </h2>

            <p className="text-gray-500 mt-2">
              Notes for this subject will be added soon.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter._id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:border-blue-300 hover:shadow-md transition"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  {chapter.chapterNumber}
                </div>

                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    {chapter.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {chapter.description}
                  </p>
                </div>
              </div>

              <a
                href={chapter.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shrink-0"
              >
                View PDF →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SubjectNotes;
