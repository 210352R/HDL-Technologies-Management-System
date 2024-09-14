// basic express server in modulejs
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import QRCode from "qrcode";
import generateQRCode from "./utils/qrcode_handler.js";

// create express app ---
const app = express();

// add in-built middlewears ----
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create simple endpoint ------
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/generate-qr", async (req, res) => {
  const itemCode = req.query.item_code; // Extract item_code from the request

  try {
    const qrCode = await QRCode.toDataURL(itemCode);
    res.status(200).json({ qrcode: qrCode }); // Send the QR code as a JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

const port = process.env.PORT || 8000;
// Set Port to work as server ---
app.listen(port, () => {
  console.log("server is running on port " + port);
});
