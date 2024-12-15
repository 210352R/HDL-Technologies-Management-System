import React, { useState, useEffect } from "react";
import { FaEdit, FaLock, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/auth/index";
import { doSignOut } from "../../firebase/auth";

const ProfileScreen = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set email from auth context
    if (currentUser) {
      setUserEmail(currentUser.email || "HDL Solutions");
    }
  }, [currentUser]);

  const handleLogout = async () => {
    // Handle logout logic
    // Firebase auth sign-out could be done here
    await doSignOut();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        {/* Profile Header */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <FaUserCircle className="text-8xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-200 mb-2">
            {userLoggedIn ? userEmail : "Guest User"}
          </h2>
        </div>

        {/* Profile Options */}
        <div className="mt-8 w-full max-w-md space-y-4">
          <button className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors">
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
          <button className="w-full py-3 bg-yellow-700 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-yellow-600 transition-colors">
            <FaLock className="mr-2" />
            Change Password
          </button>
          <button
            className="w-full py-3 bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
