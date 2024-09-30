import prisma from "../database/prisma.js";
import { sendEmailNotification } from "./emailService.js";
import { createLap, getQRCode } from "./lapService.js";
import { createUser } from "./userService.js";

// create a new bill with lap id
export const createNewBill = async (bill) => {
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
  } = bill;
  const userId = await createUser({ name, phone, address });
  const lap = await createLap({ brand, model });
  const date = new Date().toISOString(); // current date
  const newBill = await prisma.bill.create({
    data: {
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
    bill_id: newBill.id,
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
