import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Profile from "./components/Dashboard/Admin/Profile";
import VerificationPage from "./components/Dashboard/Admin/VerificationPage";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/profile" element={<Profile />} />
          <Route
            path="/admin-dashboard/verifications"
            element={<VerificationPage />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
