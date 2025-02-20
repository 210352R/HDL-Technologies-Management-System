// prisma
import generateQRCode from "../utils/qrcode_handler.js";
import prisma from "../database/prisma.js";
import { v4 as uuidv4 } from "uuid";

// create a new lap with uniq id and qr code
export const createLap = async (laptop) => {
  const { brand, model, ram, hard, ssd } = laptop;
  const lap_id = uuidv4(); // Generate a unique ID
  const qr_code = await generateQRCode(lap_id); // Generate QR code
  const newLap = await prisma.lap.create({
    data: {
      lapId: lap_id,
      brand,
      model,
      ram,
      hard,
      ssd,
      qrcode: qr_code,
    },
  });
  return newLap;
};

// create method for get all laps
export const getAllLaps = async () => {
  const laps = await prisma.lap.findMany();
  return laps;
};

// create a function that get qrcode from given lap id
export const getQRCode = async (lapId) => {
  const lap = await prisma.lap.findUnique({
    where: {
      lapId,
    },
  });
  return lap.qrcode;
};

// create a function that get all bill details by lapId
export const getBillDetails = async (lapId) => {
  const bill = await prisma.bill.findMany({
    where: {
      lapId,
    },
  });
  const lap = await prisma.lap.findUnique({
    where: {
      lapId,
    },
  });
  return { bill, lap };
};

// get lap details by lap id
export const getLapDetails = async (lapId) => {
  const lap = await prisma.lap.findUnique({
    where: {
      lapId,
    },
  });
  return lap;
};
