import React, { useState, useEffect } from "react";

const QrCodeReader = () => {
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Append each key to the scanned data
      setScannedData((prev) => prev + event.key);

      // Check for 'Enter' key to indicate scan completion
      if (event.key === "Enter") {
        console.log("Barcode Scanned:", scannedData);
        alert(`Scanned Data: ${scannedData}`);
        setScannedData(""); // Clear the scanned data after processing
      }
    };

    // Add a global keypress listener
    window.addEventListener("keypress", handleKeyPress);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [scannedData]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">SCAN QR-CODE</h1>

      <p className="text-lg">
        Scanned Data: <span className="font-mono">{scannedData}</span>
      </p>
    </div>
  );
};

export default QrCodeReader;
