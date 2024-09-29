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

// create express app ---
const app = express();

//create web socket server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow CORS for all origins
  },
});

// add connection event for web sockets

// add in-built middlewears ----
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create simple endpoint ------
app.get("/connection-rt", (req, res) => {
  console.log("connection is working");

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    io.emit("message", "A user connected"); // Emit a message to all connected clients
    console.log("messgae send -:", socket.id);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  res.json({ success: true });
});

// Use the routes
app.use("/bill", bill_router);
app.use("/qr", qr_router);
app.use("/lap", lap_router);

// set cron job for trigger every day ------------

cron.schedule("15 9 * * *", () => {
  console.log(
    "Running a task every day at 9:15 AM *************************************************** "
  );
  // Your task logic here
});
const port = process.env.PORT || 8000;
// Set Port to work as server ---
app.listen(port, () => {
  console.log("server is running on port " + port);
});
