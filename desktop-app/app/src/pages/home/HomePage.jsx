// src/pages/Dashboard.js

import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { IoIosArrowBack } from "react-icons/io";
import { io } from "socket.io-client";

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
  const [isDarkMode, setIsDarkMode] = useState(true); // State to toggle dark mode
  const [notification, setNotification] = useState(""); // State for notifications

  const socket = io("http://localhost:8000");

  useEffect(() => {
    console.log("use efeect work ****** connected ------------------ ");
    socket.on(
      "message",
      (data) => {
        console.log("Notify user ------------ ");
        setNotification(data);
        Notification.requestPermission().then((result) => {
          if (result === "granted") {
            new Notification(" Notification", { body: notification });
          }
        });
        console.log("Message received from server:", data);
      },
      [socket]
    );

    console.log("Notification received ------------------ ", notification);

    // Cleanup socket connection on component unmount
    console.log("Socket connected ------------------ ");
    return () => {
      socket.disconnect();
    };
  });

  const logOutHandler = async () => {
    await doSignOut();
    console.log("User signed out ------------------ ");
    navigate("/"); // Redirect to login page
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle Sidebar
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode); // Toggle Dark Mode

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex min-h-screen`}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-800 text-white min-h-screen transition-all duration-300">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">HDL Admin</h1>
            <nav className="space-y-4">
              <Link to="" className="block hover:bg-gray-700 px-4 py-2 rounded">
                Dashboard
              </Link>
              <Link
                to="/admin/newbill"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                New Bill
              </Link>
              <Link
                to="/all-bills"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Bills
              </Link>
              <Link
                to="/admin/users"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Users
              </Link>
              <Link
                to="/admin/settings"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Settings
              </Link>
              <Link
                to="/memory-backup"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Backup
              </Link>
              <button
                onClick={logOutHandler}
                className="w-full text-left hover:bg-red-600 px-4 py-2 rounded"
              >
                Log Out
              </button>
            </nav>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 dark:bg-gray-800 text-white shadow p-4 flex justify-between items-center">
          {/* Toggle Sidebar Button */}
          <IoIosArrowBack
            onClick={toggleSidebar}
            style={{ fontSize: "26px", cursor: "pointer" }}
          >
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </IoIosArrowBack>
          <h2 className="text-3xl font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4"></div>
        </header>

        {/* Main Content */}
        <main className="p-6 text-white">
          <Outlet /> {/* Placeholder for nested routes */}
          <h2>{notification}</h2>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
