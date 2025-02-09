import React from "react";
import axios from "axios";
import { url } from "../../url";

const ExportComponent = () => {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold text-white text-center mb-4">
          Export Database
        </h2>
        <button
          onClick={() => handleExport("json")}
          className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 
                               rounded-lg shadow-md transition-all duration-300 hover:from-gray-600 hover:to-gray-800 
                               active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          📄 Export as JSON
        </button>
      </div>
    </div>
  );
};

export default ExportComponent;
