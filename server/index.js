import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { qr_router } from "./controllers/qr_controller.js";

// prisma
import prisma from "./database/prisma.js";
import { bill_router } from "./controllers/bill_controller.js";
import { createUser } from "./services/userService.js";
import { lap_router } from "./controllers/lap_controller.js";
import { admin_router } from "./controllers/admin_controller.js";

//for cron jobs
import cron from "node-cron";
import {
  sendEmailNotification,
  sendOverdueEmailNotification,
} from "./services/emailService.js";
import { sendSms } from "./services/smsService.js";
import {
  sendOverdueBillEmail,
  updateBillStatusToOverdue,
} from "./services/billService.js";

import { db_router } from "./controllers/db_controller.js";
import { user_router } from "./controllers/user_controller.js";
import { backupDatabase } from "./services/memoryDumpService.js";

// create express app ---
const app = express();

// add in-built middleware ----
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello HDL ---  World!");
});

app.get("/api/cron", async (req, res) => {
  console.log("Running Overdue updation Task ------------------------------- ");
  updateBillStatusToOverdue()
    .then(() => {
      console.log("Bill status updated to overdue successfully");
    })
    .catch((error) => {
      console.error("Error updating bill status to overdue:", error);
    });
  res.send("User created");
});

// Use the routes
app.use("/bill", bill_router);
app.use("/qr", qr_router);
app.use("/lap", lap_router);
app.use("/users", user_router);
app.use("/db", db_router);
app.use("/admin", admin_router);

// set cron job for trigger every day ------------
cron.schedule("0 11 * * *", async () => {
  console.log("Running Overdue updation Task ------------------------------- ");
  updateBillStatusToOverdue()
    .then(() => {
      console.log("Bill status updated to overdue successfully");
    })
    .catch((error) => {
      console.error("Error updating bill status to overdue:", error);
    });
});

// set cron job for trigger every day 6.00 am ------------
cron.schedule("10 11 * * *", async () => {
  sendOverdueBillEmail("eshanmaduranga0329@gmail.com")
    .then(() => {
      console.log("Overdue bill email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending overdue bill email:", error);
    });
});

// set cron job that triggers monthly
cron.schedule("0 0 1 * *", async () => {
  try {
    await backupDatabase();
    console.log("Database backup completed successfully");
  } catch (error) {
    console.error("Backup failed:", error);
  }
});

// Start Iplement Web socket Implementation for chat process --------------

const port = process.env.PORT || 8000;
// Set Port to work as server ---
app.listen(port, () => {
  console.log("server is running on port " + port);
});
