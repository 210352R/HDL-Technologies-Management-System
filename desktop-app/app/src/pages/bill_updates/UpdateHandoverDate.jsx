import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaArrowLeft } from "react-icons/fa"; // Import an icon from react-icons

const UpdateHandOverDatePage = () => {
  const [handover_date, setHandoverDate] = useState("");
  const [issue, setIssue] = useState(""); // State for the issue field
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get billId from URL parameters
  const { billId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  // Set default date to today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setHandoverDate(today);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!billId.trim() || !handover_date.trim() || !issue.trim()) {
      setError("Bill ID, Announce Date, and Issue are required.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/bill/update-handover-date",
        {
          billId,
          handover_date,
          issue, // Include the issue in the request body
        }
      );
      setMessage("Announce date updated successfully!");
      setHandoverDate("");
      setIssue(""); // Reset issue state after successful submission
    } catch (error) {
      console.log(error);
      setError("Failed to update announce date. Please try again.");
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate(`/choose-option/${billId}`); // Navigate to the desired route
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-500 hover:text-blue-400 mb-4"
            >
              <FaArrowLeft className="mr-2" /> {/* Icon */}
              Back
            </button>
          </div>
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
                Hand Over Date:
              </label>
              <input
                type="date"
                id="announceDate"
                value={handover_date}
                onChange={(e) => setHandoverDate(e.target.value)}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <small className="text-gray-400 block mt-2">
                Default date is today's date. You can pick another date if
                needed.
              </small>
            </div>

            <div>
              <label htmlFor="issue" className="block text-lg font-medium mb-2">
                Issue:
              </label>
              <input
                type="text"
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Describe the issue"
              />
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

export default UpdateHandOverDatePage;
