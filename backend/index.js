import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dashboardRouter from "./routes/dashboard.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { test } from "./middlewares/test.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

app.use("/api/attendance", attendanceRouter);
app.use("/api/auth", authRouter);
app.use("/api/", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
