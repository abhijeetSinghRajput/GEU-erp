import express from "express";
import {
  getFullAttendance,         // NEW: returns all data in one shot
  attendanceDates,
  getAllAttendanceSubjects,
  getAttendanceTable,
  fetchCourseAttendance,
  getAttendanceBySubject,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.get("/", getAllAttendanceSubjects);
router.post("/:SubjectID", getAttendanceBySubject);

router.get("/dates", attendanceDates);
router.get("/table/:subjectCode/:startDate/:endDate", getAttendanceTable);
router.post("/course", fetchCourseAttendance);

// NEW: full attendance payload
router.get("/full/:startDate/:endDate", getFullAttendance);

export default router;

