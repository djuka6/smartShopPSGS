import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Profile from "./components/Dashboard/Admin/Profile";
import OrdersPage from "./components/Dashboard/Admin/OrdersPage";
import VerificationPage from "./components/Dashboard/Admin/VerificationPage";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute Component={AdminDashboard} />}
          />
          <Route
            path="/admin-dashboard/profile"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path="/admin-dashboard/verifications"
            element={<ProtectedRoute Component={VerificationPage} />}
          />
          <Route
            path="/admin-dashboard/orders"
            element={<ProtectedRoute Component={OrdersPage} />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function ProtectedRoute({ Component }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
}

export default App;
