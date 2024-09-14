import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="bg-blue-600 w-full py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">HDL Solutions</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
            <Link to="/about" className="text-white hover:underline">
              About
            </Link>
            <Link to="/services" className="text-white hover:underline">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center p-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to HDL Solutions
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          At HDL Solutions, we provide cutting-edge solutions to help your
          business thrive. Our expertise spans across various domains to deliver
          results that matter.
        </p>
        <Link to="/services" className="btn btn-primary text-white">
          Explore Our Services
        </Link>
      </main>

      <footer className="bg-gray-800 text-white w-full py-4 text-center">
        <p>&copy; 2024 HDL Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
