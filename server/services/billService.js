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

// create a new bill with given user id
export const createNewBillByUserId = async (bill) => {
  const {
    billId,
    userId,
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
  // const userId = await createUser({ name, phone, address });
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
    first_name: userId,
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

// create method for get all bills
export const getAllBills = async () => {
  const bills = await prisma.bill.findMany();
  return bills;
};

// update announce_date and status of bill use bill id
export const updateBillAnnounceDate = async (billId, announce_date) => {
  const updatedBill = await prisma.bill.update({
    where: {
      billId: billId,
    },
    data: {
      announce_date,
      status: "Pending",
    },
  });
  return updatedBill;
};

export const updateBillHandoverDate = async (
  billId,
  handover_date,
  newIssue
) => {
  // Fetch the current bill
  const currentBill = await prisma.bill.findUnique({
    where: {
      billId: billId,
    },
  });

  if (!currentBill) {
    throw new Error(`Bill with ID ${billId} not found.`);
  }

  // Concatenate the current issue with the new issue
  const updatedIssue = `${currentBill.issue || ""} ${newIssue}`.trim();

  // Update the bill with the new values
  const updatedBill = await prisma.bill.update({
    where: {
      billId: billId,
    },
    data: {
      handover_date,
      status: "In Progress",
      issue: updatedIssue,
    },
  });

  return updatedBill;
};

// update status of bill use bill id
export const updateBillStatus = async (billId, status) => {
  const updatedBill = await prisma.bill.update({
    where: {
      billId: billId,
    },
    data: {
      status,
    },
  });
  return updatedBill;
};

export const getNearestBill = async () => {
  const today = new Date(); // Get the current date

  // Step 1: Fetch bills from the database without complex orderBy logic
  const bills = await prisma.bill.findMany({
    where: {
      // Filter out completed and cancelled bills
      NOT: [{ status: "Completed" }, { status: "Cancelled" }],
    },
  });

  // Step 2: Get the overdue bills
  const overDueBills = bills.filter((bill) => bill.status === "Overdue");

  // Step 3: Filter Pending and In Progress bills
  const pendingAndInProgressBills = bills.filter(
    (bill) => bill.status === "Pending" || bill.status === "In Progress"
  );

  // Step 4: Calculate the time difference for Pending and In Progress bills
  const nearestBills = pendingAndInProgressBills
    .map((bill) => {
      let timeDifference;
      if (bill.status === "Pending") {
        // Calculate time difference between today and announce_date for Pending bills
        if (bill.announce_date) {
          timeDifference = Math.abs(new Date(bill.announce_date) - today);
        }
      } else if (bill.status === "In Progress") {
        // Calculate time difference between today and handover_date for In Progress bills
        if (bill.handover_date) {
          timeDifference = Math.abs(new Date(bill.handover_date) - today);
        }
      }

      return {
        ...bill,
        timeDifference,
      };
    })
    .filter((bill) => bill.timeDifference !== undefined) // Filter out bills without timeDifference
    .sort((a, b) => a.timeDifference - b.timeDifference); // Sort by nearest date

  // make array combine with overdue bills and nearest bills
  const nearestBillsWithOverdue = [...overDueBills, ...nearestBills];

  // Step 5: Return the nearest bill(s)
  return nearestBillsWithOverdue;
};

// create a function that if handover_date is less than today, then update status to "Overdue"
// if handover_date is not given and announce date is given and less than today, set it to "Overdue"
// if handover_date is given and announce date is given, if announce date is less than today is no problem
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
    if (bill.status === "In Progress") {
      if (bill.handover_date && bill.handover_date < new Date()) {
        // update status to "Overdue"
        await prisma.bill.update({
          where: {
            id: bill.id,
          },
          data: {
            status: "Overdue",
          },
        });
      }
    } else if (bill.status === "Pending") {
      if (bill.announce_date < new Date()) {
        // update status to "Overdue"
        await prisma.bill.update({
          where: {
            id: bill.id,
          },
          data: {
            status: "Overdue",
          },
        });
      }
    }
  }
};

// create function for get only overdue  bills (use prisma)
export const getOverdueBills = async () => {
  const bills = await prisma.bill.findMany({
    where: {
      status: "Overdue",
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

  if (overdueBills && overdueBills.length > 0) {
    sendOverdueEmailNotification(overdueBills, mail);
  }
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

// Get all details of a bill by bill ID and map user details
export const getBillDetailsById = async (billId) => {
  const bill = await prisma.bill.findUnique({
    where: {
      id: billId,
    },
  });

  if (!bill) {
    throw new Error("Bill not found");
  }

  const lap = await getLapDetails(bill.lapId);
  const user = await prisma.user.findUnique({
    where: {
      id: bill.userId,
    },
  });

  // Add lap and user details to the bill object
  return {
    ...bill,
    lap,
    user,
  };
};

// Get all details of a bill by bill ID and map user details
export const getBillDetailsByBillId = async (billId) => {
  // Fetch the bill using find (assuming billId is part of the primary key)
  const bills = await prisma.bill.findMany({
    where: {
      billId: billId, // Adjust based on your schema
    },
  });

  // Check if any bill exists
  if (bills.length === 0) {
    throw new Error("Bill not found");
  }

  const bill = bills[0]; // Get the first bill (if expecting a single result)

  // Fetch the lap details based on the lapId from the bill
  const lap = await getLapDetails(bill.lapId);

  // Fetch the user details based on the userId from the bill
  const user = await prisma.user.findFirst({
    where: {
      id: bill.userId, // Assuming userId is the unique identifier
    },
  });

  // Add lap and user details to the bill object
  return {
    ...bill,
    lap,
    user,
  };
};

// create method for  update lap issue by biiId
export const updateBillIssue = async (billId, issue) => {
  const updatedBill = await prisma.bill.update({
    where: {
      billId: billId,
    },
    data: {
      issue,
    },
  });
  return updatedBill;
};

// create method for update bill amount by biiId
export const updateBillAmount = async (billId, amount) => {
  const updatedBill = await prisma.bill.update({
    where: {
      billId: billId,
    },
    data: {
      amount,
    },
  });
  return updatedBill;
};

// create method for update lap details by get lap id use billId and then using lapId update lap details
export const updateLapDetailsByBillId = async (billId, lap) => {
  const bill = await prisma.bill.findUnique({
    where: {
      billId: billId,
    },
  });

  if (!bill) {
    throw new Error("Bill not found");
  }

  const updatedLap = await prisma.lap.update({
    where: {
      lapId: bill.lapId,
    },
    data: lap,
  });

  return updatedLap;
};

// create method for get all bills count
export const getAllBillsCount = async () => {
  const totalBillsCount = await prisma.bill.count();
  return totalBillsCount;
};

// create method for get Pending bills count
export const getPendingBillsCount = async () => {
  const pendingBillsCount = await prisma.bill.count({
    where: {
      status: "Pending",
    },
  });
  return pendingBillsCount;
};

// create method for get Overdue bills count
export const getOverdueBillsCount = async () => {
  const overdueBillsCount = await prisma.bill.count({
    where: {
      status: "Overdue",
    },
  });
  return overdueBillsCount;
};

//create method for get Completed bills count
export const getCompletedBillsCount = async () => {
  const completedBillsCount = await prisma.bill.count({
    where: {
      status: "Completed",
    },
  });
  return completedBillsCount;
};

// create method for get In Progress bills count
export const getInProgressBillsCount = async () => {
  const inProgressBillsCount = await prisma.bill.count({
    where: {
      status: "In Progress",
    },
  });
  return inProgressBillsCount;
};

// create method for delete bill using bill id
export const deleteBill = async (billId) => {
  const deletedBill = await prisma.bill.delete({
    where: {
      billId: billId,
    },
  });
  return deletedBill;
};
