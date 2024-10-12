import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";

const UpdateAnnounceDatePage = () => {
  const [announceDate, setAnnounceDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get billId from URL parameters
  const { billId } = useParams();

  // Set default date to today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setAnnounceDate(today);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!billId.trim() || !announceDate.trim()) {
      setError("Both Bill ID and Announce Date are required.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/bill/update-announce-date",
        {
          billId,
          announce_date: announceDate,
        }
      );
      setMessage("Announce date updated successfully!");

      setAnnounceDate("");
    } catch (error) {
      console.log(error);
      setError("Failed to update announce date. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Update Announce Date
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="billId"
                className="block text-lg font-medium mb-2"
              >
                Bill ID:
              </label>
              <input
                type="text"
                id="billId"
                value={billId}
                readOnly={true}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter Bill ID"
              />
            </div>

            <div>
              <label
                htmlFor="announceDate"
                className="block text-lg font-medium mb-2"
              >
                Announce Date:
              </label>
              <input
                type="date"
                id="announceDate"
                value={announceDate}
                onChange={(e) => setAnnounceDate(e.target.value)}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <small className="text-gray-400 block mt-2">
                Default date is today's date. You can pick another date if
                needed.
              </small>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-lg font-semibold text-white transition duration-300 shadow-md transform hover:scale-105"
            >
              Update Announce Date
            </button>
          </form>

          {/* Success Message */}
          {message && (
            <div className="mt-4 text-center text-green-400 font-semibold">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-center text-red-400 font-semibold">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateAnnounceDatePage;
