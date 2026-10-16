import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Courses from "./components/Courses";
import Notes from "./components/Notes";
import TestPapers from "./components/TestPapers";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import SubjectNotes from "./pages/SubjectNotes";
import ClassNotes from "./pages/ClassNotes";
import AdminUpload from "./pages/AdminUpload";
import AdminLogin from "./pages/AdminLogin";
import TestPaperClasses from "./pages/TestPaperClasses";
import TestPaperSubjects from "./pages/TestPaperSubjects";
import TestPaperList from "./pages/TestPaperList";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNotes from "./pages/AdminNotes";
import AdminTestPapers from "./pages/AdminTestPapers";
import AdminEditTestPaper from "./pages/AdminEditTestPaper";
import AdminEditNote from "./pages/AdminEditNote";
import AdminStudents from "./pages/AdminStudents";
import StudentLogin from "./pages/StudentLogin";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <Notes />
      <TestPapers />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </>
  );
}
function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
function ProtectedStudentRoute({ children }) {
  const token = localStorage.getItem("studentToken");
  const studentData = JSON.parse(localStorage.getItem("studentData") || "null");
  const { className } = useParams();
  const location = useLocation();

  if (!token || !studentData?.className) {
    return <Navigate to="/student/login" replace />;
  }

  // Keep students inside their assigned class
  if (className && className !== studentData.className) {
    return (
      <Navigate
        to={
          location.pathname.startsWith("/test-papers")
            ? `/test-papers/${studentData.className}`
            : `/notes/${studentData.className}`
        }
        replace
      />
    );
  }

  // The general test-paper page should open the student's own class
  if (location.pathname === "/test-papers") {
    return <Navigate to={`/test-papers/${studentData.className}`} replace />;
  }

  return children;
}

function StudentLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/notes/:className"
          element={
            <ProtectedStudentRoute>
              <ClassNotes />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/notes/:className/:subject"
          element={
            <ProtectedStudentRoute>
              <SubjectNotes />
            </ProtectedStudentRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route
          path="/admin/upload"
          element={
            <ProtectedAdminRoute>
              <AdminUpload />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/test-papers"
          element={
            <ProtectedStudentRoute>
              <TestPaperClasses />
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/test-papers/:className"
          element={
            <ProtectedStudentRoute>
              <TestPaperSubjects />
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/test-papers/:className/:subject"
          element={
            <ProtectedStudentRoute>
              <TestPaperList />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/notes"
          element={
            <ProtectedAdminRoute>
              <AdminNotes />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/test-papers"
          element={
            <ProtectedAdminRoute>
              <AdminTestPapers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/test-papers/edit/:id"
          element={
            <ProtectedAdminRoute>
              <AdminEditTestPaper />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/notes/edit/:id"
          element={
            <ProtectedAdminRoute>
              <AdminEditNote />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedAdminRoute>
              <AdminStudents />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
