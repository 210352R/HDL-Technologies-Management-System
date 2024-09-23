import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center">
      <Link to="/" className="text-white flex items-center">
        <i className="fas fa-home mr-2"></i> {/* Use Font Awesome icon */}
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
