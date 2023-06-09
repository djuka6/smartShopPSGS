import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  // Load token from local storage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    // Store token in local storage
    localStorage.setItem("token", newToken);
    console.log(newToken);
  };

  const contextValues = {
    token,
    setAuthToken,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
