// make express router for end points
import express from "express";
import generateQRCode from "../utils/qrcode_handler.js";

export const qr_router = express.Router();

// Make end points for qr code generation
qr_router.get("/generate-qr", async (req, res) => {
  const itemCode = req.query.item_code; // Extract item_code from the request

  try {
    const qrCode = await generateQRCode(itemCode);
    res.status(200).json({ qrcode: qrCode }); // Send the QR code as a JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});
