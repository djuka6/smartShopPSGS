import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Text } from "@fluentui/react";
import {
  ArrowForwardDownPerson20Filled,
  CheckmarkCircle12Filled,
  ClipboardLink16Filled,
  SignOut20Filled,
} from "@fluentui/react-icons";
import "../Admin/AdminTopBar.css";
import { AuthContext } from "../../AuthContext";

function TopBar() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); // Destructure removeToken from AuthContext

  const handleLogout = () => {
    // Remove the token from local storage and AuthContext
    removeToken();
    console.log("Token removed"); // Debug line
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <Stack horizontal tokens={{ childrenGap: 10 }} className="tab-group">
        <div className="tab">
          <Link to="/admin-dashboard/profile" className="tab-link">
            <ArrowForwardDownPerson20Filled className="tab-icon" />
            <Text className="tab-text">Profil</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/admin-dashboard/verifications" className="tab-link">
            <CheckmarkCircle12Filled className="tab-icon" />
            <Text className="tab-text">Verifikacije</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/admin-dashboard/orders" className="tab-link">
            <ClipboardLink16Filled className="tab-icon" />
            <Text className="tab-text">Sve porudžbine</Text>
          </Link>
        </div>
        <div className="logout-tab">
          <div className="tab" onClick={handleLogout}>
            <SignOut20Filled
              className="tab-icon"
              title="Odjava"
              ariaLabel="Odjava"
            />
            <Text className="tab-text">Odjavi se</Text>
          </div>
        </div>
      </Stack>
    </div>
  );
}

export default TopBar;
