import React from "react";

const QRCodeDisplay = ({ qrCodeUrl }) => {
  console.log(qrCodeUrl); // Log the QR code URL to the console

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5">
      <h1 className="text-2xl font-semibold text-white mb-4">QR Code</h1>
      {qrCodeUrl ? (
        <div className="bg-white p-4 rounded shadow-lg">
          <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          <p className="mt-2 text-gray-700">Scan the QR code above.</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeDisplay;
