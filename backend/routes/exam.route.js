import express from "express";
import { downloadMarksheet, getExamSummary, getBacklogs, getAdmitCard } from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", getExamSummary);
router.get("/get-marksheet", downloadMarksheet);
router.get("/get-back-papers", getBacklogs);
router.get("/get-admit-card/:examType", getAdmitCard);
export default router;