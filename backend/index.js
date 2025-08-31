import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import freeRouter from "./routes/free.route.js";
import examRouter from "./routes/exam.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import authRouter from "./routes/auth.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://student-geu.netlify.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

app.use("/api/fee", freeRouter);
app.use("/api/exam", examRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/auth", authRouter);
app.use("/api", dashboardRouter);

// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("/{*splat}", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
