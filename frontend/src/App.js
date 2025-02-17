import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import DynamicVerticalCarousel from "../src/components/DynamicVerticalCarousel";
import Dashboard from "../src/components/Dashboard";
import StudentManagement from "../src/pages/StudentManagement/StudentManagement";
import TeacherManagement from "../src/pages/TeacherManagement/TeacherManagement";
import ClassManagement from "../src/pages/ClassManagement/ClassManagement";
import PaymentManagement from "../src/pages/PaymentManagement/PaymentManagement";
import AttendanceManagement from "../src/pages/AttendanceManagement/AttendanceManagement";
import CoursesManagement from "../src/pages/CoursesManagement/CoursesManagement";
import Login from "../src/components/Login";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Inventory from "../src/pages/Inventory";
import Grades from "../src/pages/Grades";
import Footer from "../src/components/Footer";

function AppContent() {
  const location = useLocation();
  const hideFooterPaths = ["/courses"]; // Pages où le footer ne doit pas apparaître

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow"> 
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
                <DynamicVerticalCarousel />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/students" element={<ProtectedRoute allowedRoles={["public", "admin"]}><StudentManagement /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/teachers" element={<ProtectedRoute allowedRoles={["admin"]}><TeacherManagement /></ProtectedRoute>} />
          <Route path="/classes" element={<ProtectedRoute allowedRoles={["public", "admin"]}><ClassManagement /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute allowedRoles={["admin"]}><PaymentManagement /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute allowedRoles={["public", "admin"]}><AttendanceManagement /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute allowedRoles={["public", "admin"]}><CoursesManagement /></ProtectedRoute>} />
        </Routes>
      </div>
      
      {/* Afficher le footer sauf si on est sur la page /courses */}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AppContent />
    </Router>
  );
}

export default App;
