import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AdminEditTestPaper() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    type: "chapter",
    chapterNumber: "",
    title: "",
    description: "",
    year: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPaper = async () => {
      try {
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

        const paper = data.find((item) => item._id === id);

        if (!paper) {
          throw new Error("Test paper not found");
        }

        setFormData({
          className: paper.className || "",
          subject: paper.subject || "",
          type: paper.type || "chapter",
          chapterNumber: paper.chapterNumber ?? "",
          title: paper.title || "",
          description: paper.description || "",
          year: paper.year || "",
        });
      } catch (error) {
        console.error(error);
        setMessage(error.message || "Unable to load test paper.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
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

    if (formData.type === "chapter") {
      const chapter = Number(formData.chapterNumber);

      if (!Number.isInteger(chapter) || chapter < 1) {
        setMessage("Please enter a valid chapter number.");
        return;
      }
    }

    const year = Number(formData.year);

    if (!Number.isInteger(year) || year < 2000 || year > 2100) {
      setMessage("Please enter a valid year between 2000 and 2100.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/test-papers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          chapterNumber:
            formData.type === "chapter" ? Number(formData.chapterNumber) : null,
          year,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update test paper");
      }

      setMessage("Test paper updated successfully.");

      setTimeout(() => {
        navigate("/admin/test-papers");
      }, 700);
    } catch (error) {
      console.error(error);

      setMessage(error.message || "Unable to update test paper.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-500">Loading test paper...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/admin/test-papers"
          className="inline-flex items-center text-blue-600 font-medium mb-6 hover:text-blue-800"
        >
          ← Back to Test Papers
        </Link>

        <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mt-3">
          Edit Test Paper
        </h1>

        <p className="text-gray-600 mt-3">
          Update the details of this test paper.
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
          {/* Class */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Class
            </label>

            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="maths">Maths</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="social-science">Social Science</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paper Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="chapter">Chapter Paper</option>

              <option value="annual">Annual Paper</option>
            </select>
          </div>

          {/* Chapter Number */}
          {formData.type === "chapter" && (
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-gray-500 text-sm mt-2">
                This determines which chapter the paper appears under.
              </p>
            </div>
          )}

          {/* Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Examination Year
            </label>

            <input
              type="number"
              name="year"
              min="2000"
              max="2100"
              value={formData.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <Link
              to="/admin/test-papers"
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

export default AdminEditTestPaper;
