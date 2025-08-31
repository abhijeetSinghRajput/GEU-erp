import express from "express";
import { checkSession } from "../middlewares/checkSession.middleware.js";
import {
  getAllAttendanceSubjects,
  getAttendanceBySubject,
} from "../controllers/attendance.controller.js";
const router = express.Router();
router.use(checkSession);

router.get("/", getAllAttendanceSubjects);
router.post("/:SubjectID", getAttendanceBySubject);

export default router;
