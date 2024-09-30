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
import { sendEmailNotification } from "./services/emailService.js";

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

cron.schedule("4 19 * * *", () => {
  console.log(
    "Running a task every day at 9:15 AM *************************************************** "
  );

  console.log("message sent to all connected users");
  // Your task logic here
});

const bill = {
  first_name: "John",
  bill_id: 12345,
  laptop_id: "LAP123456",
  laptop_model: "Dell XPS 13",
  announce_date: "2024-09-01",
  handover_date: "2024-09-10",
  issue_description: "Battery not charging",
  price: 1200.5,
  qr_code: "https://example.com/qr-code",
  email: "ravidulwh01@gmail.com",
};

sendEmailNotification(bill);

const port = process.env.PORT || 8000;
// Set Port to work as server ---
server.listen(port, () => {
  console.log("server is running on port " + port);
});
