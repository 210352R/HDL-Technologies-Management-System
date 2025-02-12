import prisma from "../database/prisma.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Fetch all data from DB
export const fetchData = async () => ({
  users: await prisma.user.findMany(),
  bills: await prisma.bill.findMany(),
  laps: await prisma.lap.findMany(),
  companies: await prisma.company.findMany(),
  rooms: await prisma.room.findMany(),
});

// Generate JSON file
export const generateJSON = async () => {
  const data = await fetchData();
  const filePath = path.join(__dirname, "../database_dump.json");

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  // Save log in database
  await prisma.exportLogs.create({
    data: { fileType: "JSON", status: "Success" },
  });
  console.log("Save Log in Database ------------------------ ");
  return filePath;
};

export const getDaysSinceLastExport = async () => {
  const lastExport = await prisma.exportLogs.findFirst({
    orderBy: { timestamp: "desc" }, // Get the latest export
  });

  if (!lastExport) return null; // No previous exports

  const lastExportDate = new Date(lastExport.timestamp);
  const currentDate = new Date();
  const diffTime = currentDate - lastExportDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};
