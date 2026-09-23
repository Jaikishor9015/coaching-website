import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/notes/:className" element={<ClassNotes />} />
        <Route path="/notes/:className/:subject" element={<SubjectNotes />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/upload"
          element={
            <ProtectedAdminRoute>
              <AdminUpload />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/test-papers" element={<TestPaperClasses />} />

        <Route path="/test-papers/:className" element={<TestPaperSubjects />} />

        <Route
          path="/test-papers/:className/:subject"
          element={<TestPaperList />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
