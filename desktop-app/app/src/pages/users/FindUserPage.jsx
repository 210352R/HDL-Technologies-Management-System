import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaUser, FaPhoneAlt } from "react-icons/fa";

const FindUserByPhone = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setUser(null);

    try {
      const response = await axios.get(
        `http://your-api-url.com/get-user-by-phone/${phone}`
      );
      setUser(response.data.user);
    } catch (err) {
      setError("User not found or an error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Find User by Phone
        </h1>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaPhoneAlt className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Enter phone number"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            <FaSearch />
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {user && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              User Details
            </h2>
            <div className="flex items-center mb-2">
              <FaUser className="text-gray-600 mr-2" />
              <p className="text-gray-700 font-medium">Name: {user.name}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhoneAlt className="text-gray-600 mr-2" />
              <p className="text-gray-700 font-medium">Phone: {user.phone}</p>
            </div>
            {/* Add more user details here if available */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindUserByPhone;
