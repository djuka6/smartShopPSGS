import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { decodeToken } from "jsonwebtoken"; // Example JWT token decoding library

import CustomerDashboard from "./CustomerDashboard";
import SellerDashboard from "./SellerDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const history = useHistory();
  const token = localStorage.getItem("token"); // Retrieve the token from storage

  // Check if the token exists and decode it to get the user's role
  const decodedToken = token ? decodeToken(token) : null;
  const userRole = decodedToken ? decodedToken.role : null;

  // Redirect users based on their role
  switch (userRole) {
    case 0: // Customer
      return <Redirect to="/customer" />;
    case 1: // Seller
      return <Redirect to="/seller" />;
    case 2: // Admin
      return <Redirect to="/admin" />;
    default:
      // Handle other cases or unauthorized access
      history.push("/login");
      return null;
  }
};

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route path="/customer" component={CustomerDashboard} />
      <Route path="/seller" component={SellerDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={Dashboard} />
    </Switch>
  );
};

export default DashboardRoutes;
