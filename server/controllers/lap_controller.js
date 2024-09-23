import express from "express";
import { getBillDetails } from "../services/lapService.js";

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
