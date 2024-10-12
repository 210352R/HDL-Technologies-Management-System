import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

const UpdateBillIssuePage = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [issue, setIssue] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch bill details by billId
  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/bill/get-bill-by-bill-id/${billId}`
        );
        setBill(response.data.bill);
        setIssue(response.data.bill.issue || ""); // Set initial issue
      } catch (err) {
        setError("Failed to fetch bill details.");
        console.error(err);
      }
    };

    fetchBillDetails();
  }, [billId]);

  // Handle updating the bill issue
  const handleUpdateIssue = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/update-bill-issue",
        {
          billId,
          issue,
        }
      );
      setMessage("Bill issue updated successfully!");

      // Navigate to the new page after a short delay
      setTimeout(() => {
        navigate(`/choose-option/${billId}`);
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError("Failed to update the bill issue.");
      console.error(err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-xl rounded-lg p-8 w-full max-w-lg transition-transform transform hover:scale-105">
          <h1 className="text-3xl font-bold text-center mb-6">
            Update Bill Issue
          </h1>
          {bill ? (
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Bill ID: {billId}</h2>
                <p>
                  <strong>Lap ID:</strong> {bill.lapId}
                </p>
                <p>
                  <strong>Brand:</strong> {bill.brand}
                </p>
                <p>
                  <strong>Model:</strong> {bill.model}
                </p>
                <p>
                  <strong>Current Issue:</strong> {bill.issue}
                </p>
                <p>
                  <strong>Amount:</strong> ${bill.amount.toFixed(2)}
                </p>
              </div>

              {/* Text Area for Issue Update */}
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Enter the updated issue..."
                className="w-full p-2 rounded-md text-gray-800"
                rows="4"
              ></textarea>

              <button
                onClick={handleUpdateIssue}
                className="w-full py-2 rounded-md text-lg font-semibold text-white bg-green-600 hover:bg-green-500 transition duration-300 shadow-md"
              >
                Update Issue
              </button>

              {/* Success Message */}
              {message && (
                <div className="mt-4 text-center text-green-400 font-semibold">
                  {message}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center">Loading bill details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateBillIssuePage;
