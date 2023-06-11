import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Text } from "@fluentui/react";
import {
  ArrowForwardDownPerson20Filled,
  ShoppingBag16Filled,
  BuildingShop16Filled,
  SignOut20Filled,
  WindowNew16Filled,
} from "@fluentui/react-icons";
import "../Seller/SellerTopBar.css";
import { AuthContext } from "../../AuthContext";

function SellerTopBar() {
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
          <Link to="/seller-dashboard/profile" className="tab-link">
            <ArrowForwardDownPerson20Filled className="tab-icon" />
            <Text className="tab-text">Profil</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/seller-dashboard/products" className="tab-link">
            <WindowNew16Filled className="tab-icon tab-icon-window" />
            <Text className="tab-text">Dodavanje artikla</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/seller-dashboard/new-orders" className="tab-link">
            <ShoppingBag16Filled className="tab-icon" />
            <Text className="tab-text">Nove porudžbine</Text>
          </Link>
        </div>
        <div className="tab">
          <Link to="/seller-dashboard/orders" className="tab-link">
            <BuildingShop16Filled className="tab-icon" />
            <Text className="tab-text">Moje porudžbine</Text>
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

export default SellerTopBar;
