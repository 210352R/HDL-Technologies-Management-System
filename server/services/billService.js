import prisma from "../database/prisma.js";
import {
  sendEmailNotification,
  sendOverdueEmailNotification,
} from "./emailService.js";
import { createLap, getLapDetails, getQRCode } from "./lapService.js";
import { createUser } from "./userService.js";

// create a new bill with lap id
export const createNewBill = async (bill) => {
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
  } = bill;
  const userId = await createUser({ name, phone, address });
  const lap = await createLap({ brand, model, ram, hard, ssd });
  const date = new Date().toISOString(); // current date
  const newBill = await prisma.bill.create({
    data: {
      billId,
      lapId: lap.lapId,
      userId,
      issue,
      amount,
      date,
      announce_date,
      handover_date,
      status,
      images,
    },
  });
  const email_bill = {
    first_name: name,
    bill_id: newBill.billId,
    laptop_id: lap.lapId,
    laptop_model: model,
    laptop_brand: brand,
    announce_date: announce_date,
    handover_date: handover_date,
    issue_description: issue,
    price: amount,
    qr_code: lap.qrcode,
    email: "eshanmaduranga0329@gmail.com",
  };
  sendEmailNotification(email_bill);
  return { bill: newBill, qr_code: lap.qrcode };
};

// create bill for existing lap
export const createBillForExistingLap = async (bill) => {
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
  } = bill;

  const userId = await createUser({ name, phone, address });
  const date = new Date().toISOString(); // current date
  const newBill = await prisma.bill.create({
    data: {
      lapId,
      userId,
      issue,
      amount,
      date,
      announce_date,
      handover_date,
      status,
      images,
    },
  });
  const qrcode = await getQRCode(lapId);
  return { bill: newBill, qr_code: qrcode };
};

// create method for get all bills
export const getAllBills = async () => {
  const bills = await prisma.bill.findMany();
  return bills;
};

// update announce_date and status of bill use bill id
export const updateBillAnnounceDate = async (billId, announce_date) => {
  const updatedBill = await prisma.bill.update({
    where: {
      id: billId,
    },
    data: {
      announce_date,
      status: "Announced",
    },
  });
  return updatedBill;
};

// update handover_date and status of bill use bill id
export const updateBillHandoverDate = async (billId, handover_date) => {
  const updatedBill = await prisma.bill.update({
    where: {
      id: billId,
    },
    data: {
      handover_date,
      status: "In Progress",
    },
  });
  return updatedBill;
};

// update status of bill use bill id
export const updateBillStatus = async (billId, status) => {
  const updatedBill = await prisma.bill.update({
    where: {
      id: billId,
    },
    data: {
      status,
    },
  });
  return updatedBill;
};

// get bill details that have most nearest announced date or handover date to today
export const getNearestBill = async () => {
  const bill = await prisma.bill.findMany({
    orderBy: [
      {
        announce_date: "asc",
      },
      {
        handover_date: "asc",
      },
    ],
  });
  return bill;
};

// create a function that if handover_date is less than today, then update status to "Overdue" , if handover_date is not given  and announce date is given and less than today set it to "Overdue" , if there handover_date is given and announce date is given if announce date is less than today is no problem
export const updateBillStatusToOverdue = async () => {
  // get all bills
  const bills = await prisma.bill.findMany();

  // filter out bills where status is either 'Completed' or 'Cancelled'
  const filteredBills = bills.filter(
    (bill) => bill.status !== "Completed" && bill.status !== "Cancelled"
  );

  // loop through filtered bills
  for (let i = 0; i < filteredBills.length; i++) {
    const bill = filteredBills[i];

    // check if handover_date is less than today
    if (bill.handover_date < new Date()) {
      // update status to "Overdue"
      await prisma.bill.update({
        where: {
          id: bill.id,
        },
        data: {
          status: "Delayed",
        },
      });
    } else if (!bill.handover_date && bill.announce_date < new Date()) {
      // update status to "Overdue"
      await prisma.bill.update({
        where: {
          id: bill.id,
        },
        data: {
          status: "Delayed",
        },
      });
    }
  }
};

// create function for get only overdue  bills (use prisma)
export const getOverdueBills = async () => {
  const bills = await prisma.bill.findMany({
    where: {
      status: "Delayed",
    },
  });

  // for each bill in bills get lap id and add relevant lap details to the bills
  for (let i = 0; i < bills.length; i++) {
    const lap = await getLapDetails(bills[i].lapId);
    // add new property to the bill object called lap and set it to the lap object
    let lap_details = {
      lap_id: lap.lapId,
      lap_model: lap.model,
      lap_brand: lap.brand,
    };
    bills[i].lap = lap_details;
  }
  return bills;
};

// send email to the admin overdue bills
export const sendOverdueBillEmail = async (mail) => {
  const overdueBills = await getOverdueBills();
  sendOverdueEmailNotification(overdueBills, mail);
};

// Get All bill details with lap details  corresponding to it
export const getAllBillDetailsWithLaps = async () => {
  const bills = await prisma.bill.findMany({});

  // for each bill in bills get lap id and add relevant lap details to the bills
  for (let i = 0; i < bills.length; i++) {
    const lap = await getLapDetails(bills[i].lapId);
    // add new property to the bill object called lap and set it to the lap object
    let lap_details = {
      lap_id: lap.lapId,
      lap_model: lap.model,
      lap_brand: lap.brand,
      lap_ram: lap.ram,
      lap_hard: lap.hard,
      lap_ssd: lap.ssd,
    };
    bills[i].lap = lap_details;
  }
  return bills;
};
