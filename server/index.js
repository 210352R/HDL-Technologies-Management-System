// basic express server in modulejs
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { qr_router } from "./controllers/qr_controller.js";

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

// Use the routes
app.use("/qr", qr_router);

const port = process.env.PORT || 8000;
// Set Port to work as server ---
app.listen(port, () => {
  console.log("server is running on port " + port);
});
