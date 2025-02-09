import prisma from "../database/prisma.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Fetch all data from DB
const fetchData = async () => ({
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
  return filePath;
};
