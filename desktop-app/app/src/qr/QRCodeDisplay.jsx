import React, { useState, useEffect } from "react";
import axios from "axios";

const QRCodeDisplay = ({ itemCode }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/qr/generate-qr",
          {
            params: { item_code: itemCode },
          }
        );
        console.log("Data --", response.data); // Log the QR code URL
        setQrCodeUrl(response.data.qrcode); // Set the QR code URL from backend response
      } catch (err) {
        setError("Failed to load QR code");
        console.error(err);
      }
    };

    fetchQRCode(); // Call the function to fetch QR code when the component mounts
  }, []);
  console.log(qrCodeUrl); // Add this line to log the QR code URL to the console
  return (
    <div>
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeDisplay;
