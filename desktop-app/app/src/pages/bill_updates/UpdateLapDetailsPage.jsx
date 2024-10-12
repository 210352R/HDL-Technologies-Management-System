import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi"; // Importing the back arrow icon

import Navbar from "../../components/navbar/Navbar";

const UpdateLapDetailsPage = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [lap, setLap] = useState(null);
  const [ram, setRam] = useState("");
  const [ssd, setSsd] = useState("");
  const [hard, setHard] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch lap details by billId
  useEffect(() => {
    const fetchLapDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/bill/get-bill-by-bill-id/${billId}`
        );
        const lapDetails = response.data.bill.lap;

        setLap(lapDetails);
        setRam(lapDetails.ram || ""); // Set initial RAM value
        setSsd(lapDetails.ssd || ""); // Set initial SSD value
        setHard(lapDetails.hard || ""); // Set initial Hard Disk value
      } catch (err) {
        setError("Failed to fetch lap details.");
        console.error(err);
      }
    };

    fetchLapDetails();
  }, [billId]);

  // Handle updating the lap details
  const handleUpdateLapDetails = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/update-lap-details",
        {
          billId,
          lap: {
            ram,
            ssd,
            hard,
          },
        }
      );
      setMessage("Lap details updated successfully!");

      // Navigate to the new page after a short delay
      setTimeout(() => {
        navigate(`/choose-option/${billId}`);
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError("Failed to update the lap details.");
      console.error(err);
    }
  };

  // Back button handler
  const handleBack = () => {
    navigate(`/choose-option/${billId}`);
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-xl rounded-lg p-8 w-full max-w-lg transition-transform transform hover:scale-105">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-white mb-4"
          >
            <BiArrowBack className="mr-2" size={20} />
            Back
          </button>
          <h1 className="text-3xl font-bold text-center mb-6">
            Update Lap Details
          </h1>
          {lap ? (
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Bill ID: {billId}</h2>
                <p>
                  <strong>Lap ID:</strong> {lap.lapId}
                </p>
                <p>
                  <strong>Brand:</strong> {lap.brand}
                </p>
                <p>
                  <strong>Model:</strong> {lap.model}
                </p>
                <p>
                  <strong>QR Code:</strong> {lap.qrcode}
                </p>
              </div>

              {/* Editable Fields */}
              <div className="space-y-2">
                <div>
                  <label className="block mb-1">RAM:</label>
                  <input
                    type="text"
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                    placeholder="Enter RAM details..."
                    className="w-full p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1">SSD:</label>
                  <input
                    type="text"
                    value={ssd}
                    onChange={(e) => setSsd(e.target.value)}
                    placeholder="Enter SSD details..."
                    className="w-full p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1">Hard Disk:</label>
                  <input
                    type="text"
                    value={hard}
                    onChange={(e) => setHard(e.target.value)}
                    placeholder="Enter Hard Disk details..."
                    className="w-full p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <button
                onClick={handleUpdateLapDetails}
                className="w-full py-2 rounded-md text-lg font-semibold text-white bg-green-600 hover:bg-green-500 transition duration-300 shadow-md"
              >
                Update Lap Details
              </button>

              {/* Success Message */}
              {message && (
                <div className="mt-4 text-center text-green-400 font-semibold">
                  {message}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center">Loading lap details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateLapDetailsPage;
