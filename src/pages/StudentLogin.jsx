import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function StudentLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("class-8");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/students/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, className }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Student login failed.");
      }

      localStorage.setItem("studentToken", data.token);
      localStorage.setItem("studentData", JSON.stringify(data.student));

      navigate(`/notes/${data.student.className}`, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            EduCore
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            Student Login
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in using the credentials provided by your administrator.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            placeholder="Enter your username"
          />

          <label className="block text-sm font-semibold text-gray-700 mt-5 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12"
              placeholder="Enter your password"
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
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
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
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
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

          <label className="block text-sm font-semibold text-gray-700 mt-5 mb-2">
            Your Class
          </label>
          <select
            value={className}
            onChange={(event) => setClassName(event.target.value)}
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

          {error && (
            <p role="alert" className="text-red-600 text-sm mt-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default StudentLogin;
