import express from "express";
import { getExamDetails, getExamSummary, getBacklogs } from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", getExamSummary);
router.get("/get-details", getExamDetails);
router.get("/get-back-papers", getBacklogs);
export default router;