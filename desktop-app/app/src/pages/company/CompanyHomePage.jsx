import React from "react";
import { useNavigate } from "react-router-dom";

function CompanyHomePage() {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoToProfile = () => {
    navigate("/settings"); // Navigate to the profile page
  };

  console.log("Company Home Page ----------");
  return (
    <div>
      <h1>Company Home Page</h1>
      <button onClick={handleGoToProfile} style={buttonStyle}>
        Go to Profile Page
      </button>
    </div>
  );
}

// Optional: Add inline styles for the button
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
};

export default CompanyHomePage;
