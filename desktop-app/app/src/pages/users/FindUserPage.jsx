import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { url } from "../../url";
import Navbar from "../../components/navbar/Navbar";

const FindUserByPhone = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");
  const [billError, setBillError] = useState("");

  const handleSearch = async () => {
    setError("");
    setUser(null);
    setBills([]);
    setBillError("");

    try {
      const response = await axios.get(
        `${url}/users/get-user-by-phone/${phone}`
      );
      setUser(response.data.user);
    } catch (err) {
      setError("User not found or an error occurred.");
    }
  };

  const fetchBills = async (userId) => {
    setBillError("");
    setBills([]);

    try {
      const response = await axios.get(
        `${url}/bill/get-all-bills-by-user-id/${userId}`
      );
      setBills(response.data.bills);
    } catch (err) {
      setBillError("Bills could not be fetched.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-100">
            Find User by Phone
          </h1>
          <div className="flex items-center border-b border-gray-600 py-2">
            <FaPhoneAlt className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Enter phone number"
              className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none"
            >
              <FaSearch />
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {user && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">
                User Details
              </h2>
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-400 mr-2" />
                <p className="text-gray-300 font-medium">Name: {user.name}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaPhoneAlt className="text-gray-400 mr-2" />
                <p className="text-gray-300 font-medium">Phone: {user.phone}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <p className="text-gray-300 font-medium">
                  Address: {user.address}
                </p>
              </div>
              <button
                onClick={() => fetchBills(user.id)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none"
              >
                Fetch Bills
              </button>
              {billError && (
                <p className="text-red-500 text-center mt-4">{billError}</p>
              )}
            </div>
          )}
        </div>

        {/* Bills Section */}
        {bills.length > 0 && (
          <div className="mt-6 p-4 bg-gray-600 rounded-lg w-full max-w-3xl">
            <h3 className="text-lg font-semibold text-gray-200">Bills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {bills.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-gray-500 p-4 rounded-lg shadow"
                >
                  <div>
                    <strong className="text-gray-300">Bill ID:</strong>{" "}
                    {bill.id}
                  </div>
                  <div>
                    <strong className="text-gray-300">Amount:</strong> $
                    {bill.amount}
                  </div>
                  <div>
                    <strong className="text-gray-300">Date:</strong>{" "}
                    {new Date(bill.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FindUserByPhone;
