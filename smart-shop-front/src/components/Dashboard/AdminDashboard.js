import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Stack, Text } from "@fluentui/react";
import {
  ArrowForwardDownPerson20Filled,
  CheckmarkCircle12Filled,
  ClipboardLink16Filled,
} from "@fluentui/react-icons";
import TopBar from "./Admin/AdminTopBar"; // Import the TopBar component
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admin-dashboard/profile");
  };

  return (
    <div className="admin-dashboard">
      <TopBar /> {/* Render the TopBar component */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
