import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Text } from "@fluentui/react";
import {
  ArrowForwardDownPerson20Filled,
  ShoppingBag16Filled,
  BuildingShop16Filled,
  SignOut20Filled,
  Cart16Filled,
  Home16Filled,
} from "@fluentui/react-icons";
import "./CustomerTopBar.css";
import { AuthContext } from "../../AuthContext";

function CustomerTopBar() {
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
          <Link to="/customer-dashboard" className="tab-link">
            <Home16Filled className="tab-icon" />
            <Text className="tab-text">Početna</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/customer-dashboard/profile" className="tab-link">
            <ArrowForwardDownPerson20Filled className="tab-icon" />
            <Text className="tab-text">Profil</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/customer-dashboard/new-order" className="tab-link">
            <Cart16Filled className="tab-icon tab-icon-window" />
            <Text className="tab-text">Nova porudžbinа</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/customer-dashboard/my-orders" className="tab-link">
            <ShoppingBag16Filled className="tab-icon" />
            <Text className="tab-text">Моје porudžbine</Text>
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

export default CustomerTopBar;
