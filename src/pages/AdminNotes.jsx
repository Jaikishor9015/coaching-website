import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

function AdminNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await fetch(`${API_URL}/api/notes/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch notes");
        }

        setNotes(data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Unable to load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

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
              Manage Notes
            </h1>

            <p className="text-gray-600 mt-4">
              View all study notes uploaded to the platform.
            </p>
          </div>

          <Link
            to="/admin/upload"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            + Upload Note
          </Link>
        </div>

        {/* Count */}
        {!loading && !error && (
          <div className="mt-8">
            <span className="inline-flex bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {notes.length} Note
              {notes.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && <p className="text-gray-500 mt-10">Loading notes...</p>}

        {/* Error */}
        {error && (
          <div className="mt-10 bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && notes.length === 0 && (
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <div className="text-4xl">📚</div>

            <h2 className="text-xl font-bold text-gray-900 mt-4">
              No notes uploaded yet
            </h2>

            <p className="text-gray-500 mt-2">
              Upload your first study note to see it here.
            </p>

            <Link
              to="/admin/upload"
              className="inline-flex items-center mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Upload Note →
            </Link>
          </div>
        )}

        {/* Notes */}
        {!loading && !error && notes.length > 0 && (
          <div className="mt-8 space-y-4">
            {notes.map((note, index) => (
              <motion.div
                key={note._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      {note.chapterNumber}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {note.className}
                        </span>

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {note.subject}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mt-3">
                        {note.title}
                      </h2>

                      {note.description && (
                        <p className="text-gray-500 text-sm mt-1">
                          {note.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={note.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      View PDF →
                    </a>
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

export default AdminNotes;
