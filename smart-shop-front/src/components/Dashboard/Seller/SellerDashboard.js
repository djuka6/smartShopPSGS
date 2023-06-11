import React from "react";
import { Text } from "@fluentui/react";
import SellerTopBar from "./SellerTopBar";

const SellerDashboard = () => {
  return (
    <div>
      <SellerTopBar />
      <Text variant="xLarge">Seller Dashboard</Text>
      {/* Add seller-specific content */}
    </div>
  );
};

export default SellerDashboard;
