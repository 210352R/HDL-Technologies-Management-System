import express from "express";
import { createLap } from "../services/lapService.js";
import {
  createBillForExistingLap,
  createNewBill,
  getAllBillDetailsWithLaps,
  getAllBills,
  getAllBillsCount,
  getBillDetailsByBillId,
  getBillDetailsById,
  getCompletedBillsCount,
  getInProgressBillsCount,
  getNearestBill,
  getOverdueBillsCount,
  getPendingBillsCount,
  updateBillAmount,
  updateBillAnnounceDate,
  updateBillHandoverDate,
  updateBillIssue,
  updateBillStatus,
  updateLapDetailsByBillId,
} from "../services/billService.js";
import { getAllBillsByUserId } from "../services/userService.js";

export const bill_router = express.Router();

//create get method for get all bills
bill_router.get("/get-all-bills", async (req, res) => {
  try {
    const bills = await getAllBillDetailsWithLaps();
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
    billId,
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
    ram,
    hard,
    ssd,
    images,
  } = req.body;
  try {
    const bill = {
      billId,
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
      ram,
      hard,
      ssd,
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
  let { billId, announce_date, issue } = req.body;
  try {
    announce_date = new Date(announce_date).toISOString(); // Convert to ISO string
    const updatedBill = await updateBillAnnounceDate(billId, announce_date);
    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Announce date could not be updated" });
  }
});

// add put route for update handover date
bill_router.put("/update-handover-date", async (req, res) => {
  let { billId, handover_date, issue } = req.body;

  try {
    handover_date = new Date(handover_date).toISOString();
    const updatedBill = await updateBillHandoverDate(
      billId,
      handover_date,
      issue
    );
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

bill_router.get("/get-recent-bills", async (req, res) => {
  try {
    const recentBills = await getNearestBill();
    res.status(200).json({ bills: recentBills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Recent bills could not be fetched" });
  }
});

// add put route for make status as Completed
bill_router.put("/make-status-cancalled", async (req, res) => {
  const { billId } = req.body;
  try {
    const updatedBill = await updateBillStatus(billId, "Cancalled");
    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Status could not be updated" });
  }
});

// add get rout for get all bills by billId
bill_router.get("/get-bill-by-id/:billId", async (req, res) => {
  const { billId } = req.params;
  try {
    const bill = await getBillDetailsById(billId);
    res.status(200).json({ bill: bill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bill could not be fetched" });
  }
});

bill_router.get("/get-bill-by-bill-id/:billId", async (req, res) => {
  const { billId } = req.params;
  try {
    const bill = await getBillDetailsByBillId(billId);
    res.status(200).json({ bill: bill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bill could not be fetched" });
  }
});

// create api end point for updateBillIsuue by  billd
bill_router.put("/update-bill-issue", async (req, res) => {
  const { billId, issue } = req.body;
  try {
    const updatedBill = await updateBillIssue(billId, issue);
    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Issue could not be updated" });
  }
});

// create get method for update amount by billId
bill_router.put("/update-amount", async (req, res) => {
  const { billId, amount } = req.body;
  try {
    const updatedBill = await updateBillAmount(billId, amount);
    res.status(200).json({ bill: updatedBill });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Amount could not be updated" });
  }
});

// create method for update lap details
bill_router.put("/update-lap-details", async (req, res) => {
  const { billId, lap } = req.body;
  try {
    const updatedLap = await updateLapDetailsByBillId(billId, lap);
    res.status(200).json({ lap: updatedLap });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Lap details could not be updated" });
  }
});

//create endpoint for get total bill coiunt
bill_router.get("/get-all-bills-count", async (req, res) => {
  try {
    const billCount = await getAllBillsCount();
    res.status(200).json({ count: billCount });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched" });
  }
});

// create method for get pending bills count
bill_router.get("/get-pending-bills-count", async (req, res) => {
  try {
    const pendingBills = await getPendingBillsCount();
    res.status(200).json({ count: pendingBills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched" });
  }
});

//create method for get overdue bills count
bill_router.get("/get-overdue-bills-count", async (req, res) => {
  try {
    const overdueBills = await getOverdueBillsCount();
    res.status(200).json({ count: overdueBills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched" });
  }
});

// create get method for get Inprogress bills count
bill_router.get("/get-in-progress-bills-count", async (req, res) => {
  try {
    const inprogressBills = await getInProgressBillsCount();
    res.status(200).json({ count: inprogressBills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched" });
  }
});

// create method for get completed bill count
bill_router.get("/get-completed-bills-count", async (req, res) => {
  try {
    const completedBills = await getCompletedBillsCount();
    res.status(200).json({ count: completedBills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bills could not be fetched" });
  }
});

// get all bills by user Id
bill_router.get("/get-all-bills-by-user-id/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const bills = await getAllBillsByUserId(userId);
    res.status(200).json({ bills: bills });
  } catch (error) {
    res
      .status(400)
      .json({ error: error, message: "Bills could not be fetched" });
  }
});
