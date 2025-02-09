import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/auth";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();
  console.log("Check LOGIN VALIDATION ---------------------");
  if (!userLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
