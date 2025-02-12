import express from "express";
import {
  backupDatabase,
  getFileDetails,
} from "../services/memoryDumpService.js";
import {
  fetchData,
  generateJSON,
  getDaysSinceLastExport,
} from "../services/dump_service.js";

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
    const data = await fetchData();
    console.log("Succcessfully get all Daatabase Data  ----------- ");
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("Error in Exporting JSON: ", error);
    res
      .status(500)
      .json({ error: "Failed to export JSON", details: error.message });
  }
});

// create endpoint for get days since last export
db_router.get("/days-since-last-export", async (req, res) => {
  try {
    const days = await getDaysSinceLastExport();
    res.status(200).json({ days });
  } catch (error) {
    console.error("Fetch days since last export failed:", error);
    res
      .status(500)
      .json({ message: "Days since last export failed", error: error.message });
  }
});
