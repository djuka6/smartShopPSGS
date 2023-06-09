import React from "react";
import { Link } from "react-router-dom";
import { Stack, Text } from "@fluentui/react";
import {
  ArrowForwardDownPerson20Filled,
  CheckmarkCircle12Filled,
  ClipboardLink16Filled,
} from "@fluentui/react-icons";
import "../Admin/AdminTopBar.css";

function TopBar() {
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
      </Stack>
    </div>
  );
}

export default TopBar;
