import QRCode from "qrcode";

// Function to generate QR code for a given item_code
const generateQRCode = async (itemCode) => {
  try {
    const url = await QRCode.toDataURL(itemCode);
    console.log("QR Code generated successfully!");
    return url; // This returns a base64 string of the QR code
  } catch (err) {
    console.error("Failed to generate QR code", err);
    throw err;
  }
};

export default generateQRCode;
