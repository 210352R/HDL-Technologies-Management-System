// prisma
import generateQRCode from "../utils/qrcode_handler.js";
import prisma from "./database/prisma.js";
import { v4 as uuidv4 } from "uuid";

// create a new lap with uniq id and qr code
export const createLap = async (laptop) => {
  const { brand, model } = laptop;
  const lap_id = uuidv4(); // Generate a unique ID
  const qr_code = await generateQRCode(lap_id); // Generate QR code
  const newLap = await prisma.lap.create({
    data: {
      lapId: lap_id,
      brand,
      model,
      qr_code,
    },
  });
  return newLap;
};
