import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AdminStudents() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    className: "class-8",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load students.");
      }

      setStudents(data.students || []);
    } catch (err) {
      setMessage(err.message || "Unable to load students.");
      setError(true);
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleUpdateStudent = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(false);

    if (!editingStudent) return;

    try {
      setEditLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/students/${editingStudent._id || editingStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editingStudent.name,
            username: editingStudent.username,
            className: editingStudent.className,
            password: editingStudent.password || undefined,
            isActive: editingStudent.isActive,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update student.");
      }

      setMessage(`Updated ${data.student.name} successfully.`);
      setEditingStudent(null);
      await fetchStudents();
    } catch (err) {
      setError(true);
      setMessage(err.message || "Unable to update student.");
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
    setError(false);

    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/students/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create student.");
      }

      setMessage(
        `Account created for ${data.student.name}. Username: ${data.student.username}`,
      );

      await fetchStudents();

      setFormData({
        name: "",
        username: "",
        password: "",
        className: "class-8",
      });
    } catch (err) {
      setError(true);
      setMessage(err.message || "Unable to create student account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/admin/dashboard"
          className="inline-flex text-blue-600 font-medium mb-6 hover:text-blue-800"
        >
          ← Back to Dashboard
        </Link>

        <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mt-3">
          Manage Students
        </h1>

        <p className="text-gray-600 mt-3">
          Create a unique login account and assign the student's class.
        </p>

        {message && (
          <div
            className={`mt-6 rounded-xl border p-4 ${
              error
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mt-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Student Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
              autoComplete="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="e.g. Ritik Sharma"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              maxLength={50}
              autoComplete="off"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="e.g. ritik01"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
                autoComplete="new-password"
                placeholder="Enter password (minimum 8 characters)"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.3 4.2 9 7-.3 1.2-1 2.4-2 3.4" />
                    <path d="M6.2 6.2C4 7.5 2.5 9.5 2 12c.7 2.8 4 7 10 7 1 0 2-.2 2.9-.5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enrolled Class
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

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {loading ? "Creating Account..." : "Create Student Account"}
          </button>
        </form>

        {/* Student List */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Students</h2>
              <p className="text-gray-500 text-sm mt-1">
                Total students: {students.length}
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name or username..."
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {editingStudent && (
            <form
              onSubmit={handleUpdateStudent}
              className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900">Edit Student</h3>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Student Name
                </label>
                <input
                  required
                  maxLength={100}
                  value={editingStudent.name}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  required
                  maxLength={50}
                  value={editingStudent.username}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      username: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Assigned Class
                </label>
                <select
                  value={editingStudent.className}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      className: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2 bg-white"
                >
                  {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                    <option key={grade} value={`class-${grade}`}>
                      Class {grade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  minLength={8}
                  autoComplete="new-password"
                  value={editingStudent.password}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      password: e.target.value,
                    })
                  }
                  placeholder="Leave blank to keep current password"
                  className="w-full rounded-lg border px-3 py-2 bg-white"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="student-active"
                  type="checkbox"
                  checked={editingStudent.isActive !== false}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      isActive: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-blue-600"
                />
                <label
                  htmlFor="student-active"
                  className="text-sm font-medium text-gray-700"
                >
                  Student account is active
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white font-semibold disabled:opacity-60"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {studentsLoading ? (
            <p className="text-gray-500 py-6">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500 py-6">No students found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-sm text-gray-500">
                    <th className="py-3 pr-4">Name</th>
                    <th className="py-3 pr-4">Username</th>
                    <th className="py-3 pr-4">Class</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {students
                    .filter((student) =>
                      `${student.name} ${student.username}`
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                    )
                    .map((student) => (
                      <tr
                        key={student._id || student.id}
                        className="border-b last:border-0"
                      >
                        <td className="py-4 pr-4 font-medium">
                          {student.name}
                        </td>
                        <td className="py-4 pr-4">{student.username}</td>
                        <td className="py-4 pr-4 capitalize">
                          {student.className?.replace("-", " ")}
                        </td>

                        <td className="py-4">
                          <div className="flex flex-col items-start gap-2">
                            <span
                              className={
                                student.isActive === false
                                  ? "text-red-600"
                                  : "text-green-600"
                              }
                            >
                              {student.isActive === false
                                ? "Inactive"
                                : "Active"}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                setEditingStudent({
                                  ...student,
                                  password: "",
                                })
                              }
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminStudents;
