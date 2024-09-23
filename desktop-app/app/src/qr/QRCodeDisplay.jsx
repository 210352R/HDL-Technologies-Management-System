import React from "react";

const QRCodeDisplay = ({ qrCodeUrl, brand = "", model = "" }) => {
  console.log(qrCodeUrl); // Log the QR code URL to the console

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center flex-grow p-5">
        {qrCodeUrl ? (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mb-4" />
            <p className="mt-2 text-gray-700">Scan the QR code above.</p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Laptop Details
              </h2>
              <p className="text-gray-600">
                Brand: <span className="font-medium">{brand || "N/A"}</span>
              </p>
              <p className="text-gray-600">
                Model: <span className="font-medium">{model || "N/A"}</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeDisplay;
