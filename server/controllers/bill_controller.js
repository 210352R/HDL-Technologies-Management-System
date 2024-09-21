import express from "express";
import { createLap } from "../services/lapService.js";
import { createNewBill } from "../services/billService.js";

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
bill_router.post("/add-new-bill", async (req, res) => {
  const {
    name,
    phone,
    address,
    brand,
    model,
    issue,
    amount,
    announce_date,
    handover_date,
    status,
    images,
  } = req.body;
  try {
    const bill = {
      name,
      phone,
      address,
      brand,
      model,
      issue,
      amount,
      announce_date,
      handover_date,
      status,
      images,
    };
    const newBill = await createNewBill(bill);
    res.status(201).json({ success: true, qr_code: newBill.qr_code });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bill could not be added" });
  }
});
