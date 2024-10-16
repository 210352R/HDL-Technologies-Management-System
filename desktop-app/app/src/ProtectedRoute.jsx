import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/auth";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();
  if (!userLoggedIn) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (the protected component)
  return children;
};

export default ProtectedRoute;
