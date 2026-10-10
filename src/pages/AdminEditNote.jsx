import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AdminEditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    chapterNumber: "",
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
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

        const note = data.find((item) => item._id === id);

        if (!note) {
          throw new Error("Note not found");
        }

        setFormData({
          className: note.className || "class-8",
          subject: note.subject || "science",
          chapterNumber: note.chapterNumber ?? "",
          title: note.title || "",
          description: note.description || "",
        });
      } catch (error) {
        console.error(error);
        setMessage(error.message || "Unable to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!formData.title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    const chapter = Number(formData.chapterNumber);

    if (!Number.isInteger(chapter) || chapter < 1) {
      setMessage("Please enter a valid chapter number.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          chapterNumber: chapter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update note");
      }

      setMessage("Note updated successfully.");

      setTimeout(() => {
        navigate("/admin/notes");
      }, 700);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Unable to update note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-500">Loading note...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/admin/notes"
          className="inline-flex items-center text-blue-600 font-medium mb-6 hover:text-blue-800"
        >
          ← Back to Notes
        </Link>

        <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mt-3">Edit Note</h1>

        <p className="text-gray-600 mt-3">
          Update the details of this study note.
        </p>

        {message && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-blue-700 font-medium">{message}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mt-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Class
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
            >
              <option value="class-6">Class 6</option>
              <option value="class-7">Class 7</option>
              <option value="class-8">Class 8</option>
              <option value="class-9">Class 9</option>
              <option value="class-10">Class 10</option>
              <option value="class-11">Class 11</option>
              <option value="class-12">Class 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
            >
              <option value="maths">Maths</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="social-science">Social Science</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Chapter Number
            </label>
            <input
              type="number"
              name="chapterNumber"
              min="1"
              value={formData.chapterNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
            <p className="text-gray-500 text-sm mt-2">
              This determines the order and chapter where the note appears.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <Link
              to="/admin/notes"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminEditNote;
