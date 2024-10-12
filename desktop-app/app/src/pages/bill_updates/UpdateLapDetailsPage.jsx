import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi"; // Importing the back arrow icon

import Navbar from "../../components/navbar/Navbar";
import { url } from "../../url";

const UpdateLapDetailsPage = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [lap, setLap] = useState(null);
  const [ram, setRam] = useState("");
  const [ssd, setSsd] = useState("");
  const [hard, setHard] = useState("");
  const [customRam, setCustomRam] = useState(false);
  const [customSsd, setCustomSsd] = useState(false);
  const [customHard, setCustomHard] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch lap details by billId
  useEffect(() => {
    const fetchLapDetails = async () => {
      try {
        const response = await axios.get(
          `${url}/bill/get-bill-by-bill-id/${billId}`
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
      const response = await axios.put(`${url}/bill/update-lap-details`, {
        billId,
        lap: {
          ram,
          ssd,
          hard,
        },
      });
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

  const ramOptions = ["4GB", "8GB", "16GB", "Custom"];
  const ssdOptions = ["256GB", "512GB", "1TB", "Custom"];
  const hardOptions = ["500GB", "1TB", "2TB", "Custom"];

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
                  <strong>QR Code:</strong>
                </p>
                <img src={lap.qrcode} alt="Lap" className="w-32 h-32" />
              </div>

              {/* Editable Fields */}
              <div className="space-y-2">
                {/* RAM Dropdown */}
                <div>
                  <label className="block mb-1">RAM:</label>
                  <select
                    value={customRam ? "Custom" : ram}
                    onChange={(e) => {
                      if (e.target.value === "Custom") {
                        setCustomRam(true);
                        setRam("");
                      } else {
                        setCustomRam(false);
                        setRam(e.target.value);
                      }
                    }}
                    className="w-full p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {ramOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {customRam && (
                    <input
                      type="text"
                      value={ram}
                      onChange={(e) => setRam(e.target.value)}
                      placeholder="Enter custom RAM details..."
                      className="w-full p-2 mt-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )}
                </div>

                {/* SSD Dropdown */}
                <div>
                  <label className="block mb-1">SSD:</label>
                  <select
                    value={customSsd ? "Custom" : ssd}
                    onChange={(e) => {
                      if (e.target.value === "Custom") {
                        setCustomSsd(true);
                        setSsd("");
                      } else {
                        setCustomSsd(false);
                        setSsd(e.target.value);
                      }
                    }}
                    className="w-full p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {ssdOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {customSsd && (
                    <input
                      type="text"
                      value={ssd}
                      onChange={(e) => setSsd(e.target.value)}
                      placeholder="Enter custom SSD details..."
                      className="w-full p-2 mt-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )}
                </div>

                {/* Hard Disk Dropdown */}
                <div>
                  <label className="block mb-1">Hard Disk:</label>
                  <select
                    value={customHard ? "Custom" : hard}
                    onChange={(e) => {
                      if (e.target.value === "Custom") {
                        setCustomHard(true);
                        setHard("");
                      } else {
                        setCustomHard(false);
                        setHard(e.target.value);
                      }
                    }}
                    className="w-full p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {hardOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {customHard && (
                    <input
                      type="text"
                      value={hard}
                      onChange={(e) => setHard(e.target.value)}
                      placeholder="Enter custom Hard Disk details..."
                      className="w-full p-2 mt-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )}
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
