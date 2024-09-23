import express from "express";
import { getBillDetails, getLapDetails } from "../services/lapService.js";

export const lap_router = express.Router();

// create get route for get related bills by lap id
lap_router.get("/get-bill/:lapId", async (req, res) => {
  const { lapId } = req.params;
  try {
    const bills = await getBillDetails(lapId);
    res.status(200).json({ bills: bills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched" });
  }
});

// create get route for get lap details by lap id
lap_router.get("/get-lap/:lapId", async (req, res) => {
  const { lapId } = req.params;
  try {
    const lap = await getLapDetails(lapId);
    res.status(200).json({ lap: lap });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Lap details could not be fetched" });
  }
});
