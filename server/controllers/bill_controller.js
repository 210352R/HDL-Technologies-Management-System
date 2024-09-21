import express from "express";
import { createLap } from "../services/lapService.js";

export const bill_router = express.Router();

// create post method for add lap
bill_router.post("/add-lap", async (req, res) => {
  const { brand, model } = req.body;
  try {
    const laptop = { brand, model };
    const newLap = await createLap(laptop);
    res.status(201).json(newLap);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Laptop could not be added" });
  }
});

// create post method for add bill for new laptop
