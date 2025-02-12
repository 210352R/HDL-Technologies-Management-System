import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDownload, FiDatabase } from "react-icons/fi";
import { SiMicrosoftexcel } from "react-icons/si";
import { url } from "../../url";
import Navbar from "../../components/navbar/Navbar";
import { MdWarning } from "react-icons/md"; // Import warning icon

const ExportComponent = () => {
  const [daysSinceLast, setDaysSinceLast] = useState(null);

  useEffect(() => {
    const fetchDaysSinceLastExport = async () => {
      try {
        const { data } = await axios.get(`${url}/db/days-since-last-export`);
        console.log("Days Data ----------- : ", data.days);
        setDaysSinceLast(1);
      } catch (error) {
        console.error("Failed to fetch last export date", error);
      }
    };
    fetchDaysSinceLastExport();
  }, []);
  const handleExport = async (type) => {
    try {
      const axios_url = `${url}/db/backup-json`;
      const response = await axios.get(axios_url, { responseType: "blob" });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `database_dump.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80 text-center">
          <h2 className="text-xl font-semibold text-white flex items-center justify-center gap-2">
            <FiDatabase className="text-yellow-400" size={24} /> Export Database
          </h2>

          {daysSinceLast !== null && (
            <div
              className={`mb-8 mt-6 px-4 py-2 rounded-lg text-center ${
                daysSinceLast > 12
                  ? "bg-red-800 text-red-400 border border-red-500 shadow-lg"
                  : "text-gray-300"
              }`}
            >
              {daysSinceLast > 12 && (
                <div className="flex items-center justify-center mb-1">
                  <MdWarning className="text-2xl text-red-400 animate-pulse" />
                  <span className="ml-2 font-semibold">
                    Critical: Data not exported!
                  </span>
                </div>
              )}
              <p className="font-medium text-lg">
                Last export:{" "}
                {daysSinceLast === "First export"
                  ? "Never exported before"
                  : `${daysSinceLast} days ago`}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <button
              onClick={() => handleExport("json")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 
                         rounded-lg shadow-md transition-all duration-300 hover:from-gray-600 hover:to-gray-800 
                         active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <FiDownload size={20} /> Export as JSON
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportComponent;
