import express from "express";
import {
  backupDatabase,
  getFileDetails,
} from "../services/memoryDumpService.js";
import { generateJSON } from "../services/dump_service.js";

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

db_router.get("/backup-json", async (req, res) => {
  console.log("Comes To Json Backup Endpoint method -------------");
  try {
    const filePath = await generateJSON();

    console.log("File Path: ", filePath);

    res.download(filePath, "database_dump.json", async () => {
      await fs.unlink(filePath).catch(console.error); // Delete file after download
    });
  } catch (error) {
    console.log("Error in Exporting JSON: ", error);
    res
      .status(500)
      .json({ error: "Failed to export JSON", details: error.message });
  }
});
