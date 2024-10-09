import express from "express";
import { backupDatabase } from "../services/memoryDumpService.js";

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
