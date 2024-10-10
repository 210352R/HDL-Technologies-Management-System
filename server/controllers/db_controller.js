import express from "express";
import {
  backupDatabase,
  getFileDetails,
} from "../services/memoryDumpService.js";

export const db_router = express.Router();

db_router.post("/backup", async (req, res) => {
  try {
    await backupDatabase(); // Call the async backup method
    res.status(200).json({ message: "Backup successful" });
  } catch (error) {
    console.error("Backup failed:", error);
    res.status(500).json({ message: "Backup failed", error: error.message });
  }
});

db_router.get("/getDetails", async (req, res) => {
  try {
    // Fetch the database details
    const fileDetails = await getFileDetails();
    res.status(200).json({ data: fileDetails });
  } catch (error) {
    console.error("Fetch Database Backup details failed:", error);
    res
      .status(500)
      .json({ message: "Database details failed", error: error.message });
  }
});
