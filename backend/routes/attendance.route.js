import express from "express";
import { checkSession } from "../middlewares/checkSession.middleware.js";
import {
  attendanceDates,
  fetchCourseAttendance,
  getAllAttendanceSubjects,
  getAttendanceBySubject,
  getAttendanceTable,
  getFullAttendance,
} from "../controllers/attendance.controller.js";
const router = express.Router();
router.use(checkSession);

router.get("/", getAllAttendanceSubjects);
router.post("/:SubjectID", getAttendanceBySubject);

router.get("/dates", attendanceDates);
router.get("/table/:subjectCode/:startDate/:endDate", getAttendanceTable);
router.post("/course", fetchCourseAttendance);

// NEW: full attendance payload
router.get("/full/:startDate/:endDate", getFullAttendance);

export default router;
