import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

function AdminTestPapers() {
  const [testPapers, setTestPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const fetchTestPapers = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await fetch(`${API_URL}/api/test-papers/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch test papers");
        }

        setTestPapers(data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Unable to load test papers.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestPapers();
  }, []);
  const filteredPapers = testPapers.filter((paper) => {
    const classMatch =
      selectedClass === "all" || paper.className === selectedClass;

    const subjectMatch =
      selectedSubject === "all" || paper.subject === selectedSubject;

    const typeMatch = selectedType === "all" || paper.type === selectedType;

    return classMatch && subjectMatch && typeMatch;
  });
  const handleDelete = async (paperId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this test paper?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/test-papers/${paperId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete test paper");
      }

      setTestPapers((currentPapers) =>
        currentPapers.filter((paper) => paper._id !== paperId),
      );
    } catch (error) {
      console.error(error);

      alert(error.message || "Unable to delete test paper.");
    }
  };
  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center text-blue-600 font-medium mb-6 hover:text-blue-800"
            >
              ← Back to Dashboard
            </Link>

            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
              Admin Panel
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              Manage Test Papers
            </h1>

            <p className="text-gray-600 mt-4">
              View all chapter-wise and annual test papers.
            </p>
          </div>

          <Link
            to="/admin/upload"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            + Upload Test Paper
          </Link>
        </div>

        {/* Count */}
        {!loading && !error && (
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="inline-flex w-fit bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {filteredPapers.length} Test Paper
              {filteredPapers.length !== 1 ? "s" : ""}
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="classFilter"
                className="text-sm font-medium text-gray-700"
              >
                Class:
              </label>

              <select
                id="classFilter"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Classes</option>
                <option value="class-6">Class 6</option>
                <option value="class-7">Class 7</option>
                <option value="class-8">Class 8</option>
                <option value="class-9">Class 9</option>
                <option value="class-10">Class 10</option>
                <option value="class-11">Class 11</option>
                <option value="class-12">Class 12</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="subjectFilter"
                className="text-sm font-medium text-gray-700"
              >
                Subject:
              </label>

              <select
                id="subjectFilter"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                <option value="maths">Maths</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="social-science">Social Science</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="typeFilter"
                className="text-sm font-medium text-gray-700"
              >
                Type:
              </label>

              <select
                id="typeFilter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="chapter">Chapter Papers</option>
                <option value="annual">Annual Papers</option>
              </select>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-gray-500 mt-10">Loading test papers...</p>
        )}

        {/* Error */}
        {error && (
          <div className="mt-10 bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && testPapers.length === 0 && (
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <div className="text-4xl">📝</div>

            <h2 className="text-xl font-bold text-gray-900 mt-4">
              No test papers uploaded yet
            </h2>

            <p className="text-gray-500 mt-2">
              Upload your first test paper to see it here.
            </p>

            <Link
              to="/admin/upload"
              className="inline-flex items-center mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Upload Test Paper →
            </Link>
          </div>
        )}

        {/* Test Papers */}
        {!loading && !error && testPapers.length > 0 && (
          <div className="mt-8 space-y-4">
            {filteredPapers.map((paper, index) => (
              <motion.div
                key={paper._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  {/* Information */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      {paper.type === "chapter" ? paper.chapterNumber : "A"}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {paper.className}
                        </span>

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {paper.subject}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            paper.type === "chapter"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {paper.type === "chapter" ? "Chapter" : "Annual"}
                        </span>

                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {paper.year}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mt-3">
                        {paper.title}
                      </h2>

                      {paper.description && (
                        <p className="text-gray-500 text-sm mt-1">
                          {paper.description}
                        </p>
                      )}

                      {paper.type === "chapter" && (
                        <p className="text-gray-500 text-sm mt-2">
                          Chapter {paper.chapterNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      View PDF →
                    </a>

                    <Link
                      to={`/admin/test-papers/edit/${paper._id}`}
                      className="inline-flex items-center justify-center bg-yellow-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(paper._id)}
                      className="inline-flex items-center justify-center bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminTestPapers;
