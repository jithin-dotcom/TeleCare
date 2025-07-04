
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/user/Home";
import DoctorDashboard from "./pages/doctor/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import { useAuthStore } from "./store/authStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyForgotPassword from "./pages/auth/VerifyForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const App: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = !!accessToken;
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const getDashboardRoute = () => {
    if (role === "doctor") return "/doctor-dashboard";
    if (role === "admin") return "/admin-dashboard";
    return "/user-dashboard";
  };

  
  if (!hasHydrated) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/verify-otp"
          element={!isAuthenticated ? <VerifyOtp /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/forgot-password"
          element={!isAuthenticated ? <ForgotPassword /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/verify-forgot-password"
          element={!isAuthenticated ? <VerifyForgotPassword /> : <Navigate to={getDashboardRoute()} replace />}
        />
        <Route
          path="/reset-password"
          element={!isAuthenticated ? <ResetPassword /> : <Navigate to={getDashboardRoute()} replace />}
        />

        
        <Route
          path="/user-dashboard"
          element={isAuthenticated && role === "user" ? <UserDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/doctor-dashboard"
          element={isAuthenticated && role === "doctor" ? <DoctorDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin-dashboard"
          element={isAuthenticated && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />

        
        <Route path="*" element={<Navigate to={isAuthenticated ? getDashboardRoute() : "/login"} replace />} />
      </Routes>
    </>
  );
};

export default App;

