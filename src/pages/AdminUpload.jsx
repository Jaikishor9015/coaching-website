import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AdminUpload() {
  const [uploadType, setUploadType] = useState("note");

  const [paperType, setPaperType] = useState("chapter");

  const [formData, setFormData] = useState({
    className: "class-8",
    subject: "science",
    chapterNumber: "",
    title: "",
    description: "",
    year: new Date().getFullYear(),
  });

  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUploadTypeChange = (event) => {
    setUploadType(event.target.value);
    setMessage("");
  };

  const handlePaperTypeChange = (event) => {
    setPaperType(event.target.value);

    setFormData((previous) => ({
      ...previous,
      chapterNumber: "",
    }));

    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdf) {
      setMessage("Please select a PDF file.");
      return;
    }

    if (
      uploadType === "note" ||
      (uploadType === "test-paper" && paperType === "chapter")
    ) {
      const chapterNumber = Number(formData.chapterNumber);

      if (!Number.isInteger(chapterNumber) || chapterNumber < 1) {
        setMessage("Please enter a valid chapter number.");
        return;
      }
    }

    if (uploadType === "test-paper") {
      const year = Number(formData.year);

      if (!Number.isInteger(year) || year < 2000 || year > 2100) {
        setMessage("Please enter a valid year between 2000 and 2100.");
        return;
      }
    }

    if (!formData.title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = new FormData();

      data.append("className", formData.className);
      data.append("subject", formData.subject);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("pdf", pdf);

      let endpoint = "/api/upload";

      // -----------------------------
      // STUDY NOTE
      // -----------------------------
      if (uploadType === "note") {
        data.append("chapterNumber", Number(formData.chapterNumber));
      }

      // -----------------------------
      // TEST PAPER
      // -----------------------------
      if (uploadType === "test-paper") {
        data.append("type", paperType);
        data.append("year", Number(formData.year));

        if (paperType === "chapter") {
          data.append("chapterNumber", Number(formData.chapterNumber));
        }

        endpoint = "/api/upload/test-paper";
      }

      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      setMessage(
        uploadType === "note"
          ? "Note uploaded successfully!"
          : "Test paper uploaded successfully!",
      );

      setFormData({
        className: "class-8",
        subject: "science",
        chapterNumber: "",
        title: "",
        description: "",
        year: new Date().getFullYear(),
      });

      setPdf(null);

      document.getElementById("pdf").value = "";
    } catch (error) {
      console.error(error);

      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Admin Panel
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Upload Material
          </h1>

          <p className="text-gray-600 mt-4">
            Add notes and test papers for students.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          {/* Upload Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Upload Type
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  uploadType === "note"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="uploadType"
                  value="note"
                  checked={uploadType === "note"}
                  onChange={handleUploadTypeChange}
                  className="mr-2"
                />

                <span className="font-semibold text-gray-800">Study Note</span>
              </label>

              <label
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  uploadType === "test-paper"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="uploadType"
                  value="test-paper"
                  checked={uploadType === "test-paper"}
                  onChange={handleUploadTypeChange}
                  className="mr-2"
                />

                <span className="font-semibold text-gray-800">Test Paper</span>
              </label>
            </div>
          </div>

          {/* Class */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Class
            </label>

            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
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
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="maths">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="social-science">Social Science</option>
            </select>
          </div>

          {/* Test Paper Type */}
          {uploadType === "test-paper" && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Test Paper Type
              </label>

              <div className="grid sm:grid-cols-2 gap-4">
                <label
                  className={`border rounded-xl p-4 cursor-pointer transition ${
                    paperType === "chapter"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paperType"
                    value="chapter"
                    checked={paperType === "chapter"}
                    onChange={handlePaperTypeChange}
                    className="mr-2"
                  />

                  <span className="font-semibold text-gray-800">
                    Chapter-wise
                  </span>
                </label>

                <label
                  className={`border rounded-xl p-4 cursor-pointer transition ${
                    paperType === "annual"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paperType"
                    value="annual"
                    checked={paperType === "annual"}
                    onChange={handlePaperTypeChange}
                    className="mr-2"
                  />

                  <span className="font-semibold text-gray-800">
                    Annual Exam
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Chapter Number */}
          {(uploadType === "note" ||
            (uploadType === "test-paper" && paperType === "chapter")) && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chapter Number
              </label>

              <p className="text-sm text-gray-500 mb-2">
                Enter the actual chapter number. This determines where the paper
                appears on the website.
              </p>

              <input
                type="number"
                name="chapterNumber"
                value={formData.chapterNumber}
                onChange={handleChange}
                placeholder="e.g. 5"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          {/* Year */}
          {uploadType === "test-paper" && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year
              </label>

              <p className="text-sm text-gray-500 mb-2">
                Enter the examination year, for example 2026.
              </p>

              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="2000"
                max="2100"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          {/* Title */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {uploadType === "note" ? "Chapter Title" : "Test Paper Title"}
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={
                uploadType === "note"
                  ? "e.g. Chapter 10"
                  : "e.g. Chapter 5 Test Paper"
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={
                uploadType === "note"
                  ? "e.g. Chapter 10"
                  : paperType === "chapter"
                    ? "e.g. Chapter 5 Test Paper"
                    : "e.g. Annual Examination 2026"
              }
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* PDF */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PDF File
            </label>

            <input
              id="pdf"
              type="file"
              accept=".pdf"
              onChange={(event) => setPdf(event.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Uploading..."
              : uploadType === "note"
                ? "Upload Note →"
                : "Upload Test Paper →"}
          </button>

          {/* Message */}
          {message && (
            <p className="mt-5 text-center font-medium text-gray-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default AdminUpload;
