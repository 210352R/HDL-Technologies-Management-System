import React from "react";
import Navbar from "../components/navbar/Navbar";

const QRCodeDisplay = ({ qrCodeUrl, brand = "", model = "" }) => {
  console.log("Qr Display ------------------ ", qrCodeUrl); // Log the QR code URL to the console

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5">
        {qrCodeUrl ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mb-4" />
              <p className="mt-2 text-gray-700">Scan the QR code above.</p>
            </div>
            <div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Laptop Details
                </h2>
                <p className="text-white">
                  Brand: <span className="font-medium">{brand || "N/A"}</span>
                </p>
                <p className="text-white">
                  Model: <span className="font-medium">{model || "N/A"}</span>
                </p>
              </div>
              <a
                href={qrCodeUrl}
                download="QRCode.pdf" // Sets the file name for download
                className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Download QR Code
              </a>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading QR Code...</p>
        )}
      </div>
    </>
  );
};

export default QRCodeDisplay;
