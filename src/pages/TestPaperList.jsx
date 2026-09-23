import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function TestPaperList() {
  const { className, subject } = useParams();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const subjectName = subject
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  useEffect(() => {
    const fetchTestPapers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/test-papers/${className}/${subject}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch test papers");
        }

        const data = await response.json();

        setPapers(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load test papers.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestPapers();
  }, [className, subject]);

  const chapterPapers = papers.filter((paper) => paper.type === "chapter");

  const annualPapers = papers.filter((paper) => paper.type === "annual");

  // Group chapter papers by chapter number
  const groupedChapters = chapterPapers.reduce((groups, paper) => {
    const chapter = paper.chapterNumber;

    if (!groups[chapter]) {
      groups[chapter] = [];
    }

    groups[chapter].push(paper);

    return groups;
  }, {});

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back button */}
        <Link
          to={`/test-papers/${className}`}
          className="inline-flex items-center text-blue-600 font-medium mb-8 hover:text-blue-800"
        >
          ← Back to Subjects
        </Link>

        {/* Page heading */}
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
            {subjectName} Test Papers
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl">
            Practice chapter-wise tests and annual examination papers.
          </p>

          {!loading && !error && papers.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                {chapterPapers.length} Chapter Paper
                {chapterPapers.length !== 1 ? "s" : ""}
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                {annualPapers.length} Annual Paper
                {annualPapers.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </motion.div>

        {/* Loading */}
        {loading && <p className="text-gray-500">Loading test papers...</p>}

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* No papers */}
        {!loading && !error && papers.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No test papers available yet
            </h2>

            <p className="text-gray-500 mt-2">
              Test papers for this subject will be added soon.
            </p>
          </div>
        )}

        {/* ========================= */}
        {/* CHAPTER-WISE PAPERS */}
        {/* ========================= */}

        {!loading && !error && chapterPapers.length > 0 && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Chapter-wise Papers
              </h2>

              <p className="text-gray-500 mt-2">
                Practice each chapter separately.
              </p>
            </div>

            <div className="space-y-10">
              {Object.entries(groupedChapters).map(
                ([chapterNumber, chapterPaperList]) => (
                  <div key={chapterNumber}>
                    {/* Chapter heading */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {chapterNumber}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        Chapter {chapterNumber}
                      </h3>
                    </div>

                    {/* Papers */}
                    <div className="grid md:grid-cols-2 gap-5">
                      {chapterPaperList.map((paper, index) => (
                        <motion.div
                          key={paper._id}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.06,
                          }}
                          className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                              Test Paper
                            </span>

                            <span className="text-sm text-gray-500">
                              {paper.year}
                            </span>
                          </div>

                          <h4 className="text-xl font-bold text-gray-900 mt-5">
                            {paper.title}
                          </h4>

                          {paper.description && (
                            <p className="text-gray-500 text-sm mt-2">
                              {paper.description}
                            </p>
                          )}

                          <a
                            href={paper.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                          >
                            View Paper →
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* ANNUAL PAPERS */}
        {/* ========================= */}

        {!loading && !error && annualPapers.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Annual Examination Papers
              </h2>

              <p className="text-gray-500 mt-2">
                Practice previous annual examination papers by year.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {annualPapers.map((paper, index) => (
                <motion.div
                  key={paper._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Annual Exam
                    </span>

                    <span className="text-sm text-gray-500">{paper.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mt-5">
                    {paper.title}
                  </h3>

                  {paper.description && (
                    <p className="text-gray-500 text-sm mt-2">
                      {paper.description}
                    </p>
                  )}

                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    View Paper →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TestPaperList;
