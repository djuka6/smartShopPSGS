import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { token } = useContext(AuthContext);

  return token ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
