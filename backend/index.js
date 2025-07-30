import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import dashboardRouter from "./routes/dashboard.route.js";
import attendanceRouter from "./routes/attendance.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});


app.use("/api/", dashboardRouter);
app.use("/api/attendance", attendanceRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
