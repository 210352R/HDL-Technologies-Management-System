import express from "express";
import { createLap } from "../services/lapService.js";
import {
  createBillForExistingLap,
  createNewBill,
  getAllBills,
  updateBillAnnounceDate,
  updateBillHandoverDate,
  updateBillStatus,
} from "../services/billService.js";

export const bill_router = express.Router();

//create get method for get all bills
bill_router.get("/get-all-bills", async (req, res) => {
  try {
    const bills = await getAllBills();
    res.status(200).json({ bills: bills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched" });
  }
});

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
    res
      .status(201)
      .json({ success: true, bill: newBill.bill.id, qr_code: newBill.qr_code });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bill could not be added" });
  }
});

// create post method for add bill for existing laptop
bill_router.post("/add-existing-bill", async (req, res) => {
  const {
    lapId,
    name,
    phone,
    address,
    issue,
    amount,
    announce_date,
    handover_date,
    status,
    images,
  } = req.body;
  console.log("Request body: ", req.body);
  try {
    const bill = {
      lapId,
      name,
      phone,
      address,
      issue,
      amount,
      announce_date,
      handover_date,
      status,
      images,
    };
    const newBill = await createBillForExistingLap(bill);

    res
      .status(201)
      .json({ success: true, bill: newBill.id, qr_code: newBill.qr_code });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bill could not be added" });
  }
});

// add put route for update announce date
bill_router.put("/update-announce-date", async (req, res) => {
  const { billId, announce_date } = req.body;
  try {
    const updatedBill = await updateBillAnnounceDate(billId, announce_date);
    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Announce date could not be updated" });
  }
});

// add put route for update handover date
bill_router.put("/update-handover-date", async (req, res) => {
  const { billId, handover_date } = req.body;
  try {
    const updatedBill = await updateBillHandoverDate(billId, handover_date);
    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Handover date could not be updated" });
  }
});

// add put route for make status as Completed
bill_router.put("/make-status-completed", async (req, res) => {
  const { billId } = req.body;
  try {
    const updatedBill = await updateBillStatus(billId, "Completed");
    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Status could not be updated" });
  }
});
