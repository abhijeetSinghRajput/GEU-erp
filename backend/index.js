import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import freeRouter from "./routes/free.route.js";
import examRouter from "./routes/exam.route.js";
import studentRouter from "./routes/student.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import authRouter from "./routes/auth.route.js";
import circularRouter from "./routes/circular.route.js";
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

app.use((req, res, next) => {
  const campus = req.cookies["campus"] || "deemed";
  const DEEMED_BASE_URL = "https://student.geu.ac.in/";
  const HILL_BASE_URL = "https://student.gehu.ac.in/";
  req.BASE_URL = campus === "hill" ? HILL_BASE_URL : DEEMED_BASE_URL;
  
  next();
});

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello from server" });
// });

app.use("/api/fee", freeRouter);
app.use("/api/exam", examRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/auth", authRouter);
app.use("/api", studentRouter);
app.use("/api/circular", circularRouter);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
