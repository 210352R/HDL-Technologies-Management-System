import React, { useState, useEffect } from "react";
import { FaEdit, FaLock, FaSignOutAlt, FaUserCircle } from "react-icons/fa"; // For profile icons
import { useNavigate } from "react-router-dom"; // For navigation

const ProfileScreen = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching user email from storage
    getData("email").then((email) => {
      if (email) {
        setUserEmail(email);
      }
    });
  }, []);

  const getData = async (key) => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return value;
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <FaUserCircle className="text-8xl text-gray-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{userEmail || "User Email"}</h2>
      </div>

      {/* Profile Options */}
      <div className="mt-8 w-full max-w-md space-y-4">
        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-blue-500 transition-colors">
          <FaEdit className="mr-2" />
          Edit Profile
        </button>
        <button className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-yellow-500 transition-colors">
          <FaLock className="mr-2" />
          Change Password
        </button>
        <button
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-red-500 transition-colors"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
