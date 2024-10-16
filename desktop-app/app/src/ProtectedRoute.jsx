import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Assume we are using a function isAuthenticated to check authentication status
  const isAuthenticated = localStorage.getItem("authToken"); // Replace with your auth logic

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (the protected component)
  return children;
};

export default ProtectedRoute;
