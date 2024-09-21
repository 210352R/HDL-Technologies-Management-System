import prisma from "../database/prisma.js";
import { createLap } from "./lapService.js";

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
  return { bill: newBill, qr_code: lap.qrcode };
};
