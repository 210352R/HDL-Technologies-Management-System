// basic express server in modulejs
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { qr_router } from "./controllers/qr_controller.js";

// prisma
import prisma from "./database/prisma.js";

// create express app ---
const app = express();

// add in-built middlewears ----
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create simple endpoint ------
app.get("/", (req, res) => {
  res.send("Hello World");
});
// Create a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User could not be created" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Use the routes
app.use("/qr", qr_router);

const port = process.env.PORT || 8000;
// Set Port to work as server ---
app.listen(port, () => {
  console.log("server is running on port " + port);
});
