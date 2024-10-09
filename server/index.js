// basic express server in modulejs
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { qr_router } from "./controllers/qr_controller.js";

// prisma
import prisma from "./database/prisma.js";
import { bill_router } from "./controllers/bill_controller.js";
import { createUser } from "./services/userService.js";
import { lap_router } from "./controllers/lap_controller.js";

// for web sockets---------------------------------------------------
import { Server } from "socket.io";
import http from "http";

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
import { backupDatabase } from "./services/memoryDumpService.js";

// create express app ---
const app = express();

//create web socket server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow CORS for all origins
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});

// // add connection event for web sockets
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// add in-built middlewears ----
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/user", async (req, res) => {
  const { messaage } = req.body;
  io.emit("message", messaage);
  console.log("message sent to all connected users");
  // io.on("connection", (socket) => {
  //   console.log("A user connected:", socket.id);

  //   // Handle disconnection
  //   socket.on("disconnect", () => {
  //     console.log("User disconnected:", socket.id);
  //   });
  // });
  res.json(messaage);
});

// Use the routes
app.use("/bill", bill_router);
app.use("/qr", qr_router);
app.use("/lap", lap_router);

// set cron job for trigger every day ------------

cron.schedule("5 1 * * *", async () => {
  console.log("Running Overdue updation Task ------------------------------- ");
  updateBillStatusToOverdue()
    .then(() => {
      console.log("Bill status updated to overdue successfully");
    })
    .catch((error) => {
      console.error("Error updating bill status to overdue:", error);
    });

  // Your task logic here
});

// set cron job for trigger every day 6.00 am ------------
cron.schedule("0 6 * * *", async () => {
  sendOverdueBillEmail("eshanmaduranga0329@gmail.com")
    .then(() => {
      console.log("Overdue bill email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending overdue bill email:", error);
    });
});

const port = process.env.PORT || 8000;
// Set Port to work as server ---
server.listen(port, () => {
  console.log("server is running on port " + port);
});
