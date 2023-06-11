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
import SellerDashboard from "./components/Dashboard/Seller/SellerDashboard";
import SellerProfile from "./components/Dashboard/Seller/SellerProfile";
import SellerNewProduct from "./components/Dashboard/Seller/SellerNewProduct";
import SellersOrdersPage from "./components/Dashboard/Seller/SellersOrdersPage";
import SellersOldOrdersPage from "./components/Dashboard/Seller/SellersOldOrdersPage";
import SellersProducts from "./components/Dashboard/Seller/SellersProducts";
import UpdateProduct from "./components/Dashboard/Seller/UpdateProduct"; // Import the new UpdateProduct component
import CustomerNewOrder from "./components/Dashboard/Customer/CustomerNewOrder";
import CustomerMyOrders from "./components/Dashboard/Customer/CustomerMyOrders";
import CustomerDashboard from "./components/Dashboard/Customer/CustomerDashboard";
import CustomerProfile from "./components/Dashboard/Customer/CustomerProfile";
import ContextProvider from "./components/ContextProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContextProvider>
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
            <Route
              path="/seller-dashboard"
              element={<ProtectedRoute Component={SellerDashboard} />}
            />
            <Route
              path="/seller-dashboard/profile"
              element={<ProtectedRoute Component={SellerProfile} />}
            />
            <Route
              path="/seller-dashboard/products"
              element={<ProtectedRoute Component={SellersProducts} />}
            />
            <Route
              path="/seller-dashboard/new-product"
              element={<ProtectedRoute Component={SellerNewProduct} />}
            />
            <Route
              path="/seller-dashboard/update-product/:productId" // Define the path for the update-product page with productId parameter
              element={<ProtectedRoute Component={UpdateProduct} />}
            />
            <Route
              path="/seller-dashboard/new-orders"
              element={<ProtectedRoute Component={SellersOrdersPage} />}
            />
            <Route
              path="/seller-dashboard/orders"
              element={<ProtectedRoute Component={SellersOldOrdersPage} />}
            />

            <Route
              path="/customer-dashboard/profile"
              element={<ProtectedRoute Component={CustomerProfile} />}
            />
            <Route
              path="/customer-dashboard/new-order"
              element={<ProtectedRoute Component={CustomerNewOrder} />}
            />
            <Route
              path="/customer-dashboard"
              element={<ProtectedRoute Component={CustomerDashboard} />}
            />
            <Route
              path="/customer-dashboard/my-orders"
              element={<ProtectedRoute Component={CustomerMyOrders} />}
            />
          </Routes>
        </ContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function ProtectedRoute({ Component }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
}

export default App;
