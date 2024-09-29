import express from "express";
import {
  getAllLaps,
  getBillDetails,
  getLapDetails,
} from "../services/lapService.js";

export const lap_router = express.Router();

// create get route for get all laps
lap_router.get("/get-all-laps", async (req, res) => {
  try {
    const laps = await getAllLaps();
    res.status(200).json({ laps: laps });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Laps could not be fetched" });
  }
});

// create get route for get related bills by lap id
lap_router.get("/get-bill/:lapId", async (req, res) => {
  const { lapId } = req.params;
  try {
    const { bill, lap } = await getBillDetails(lapId);

    res.status(200).json({ bills: bill, lap: lap });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched --- " });
  }
});

// create get route for get lap details by lap id
lap_router.get("/get-lap/:lapId", async (req, res) => {
  const { lapId } = req.params;
  console.log("Lap id ------------------- : ", lapId);
  try {
    const lap = await getLapDetails(lapId);
    res.status(200).json({ lap: lap });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Lap details could not be fetched" });
  }
});
