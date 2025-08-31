import express from "express";
import { downloadMarksheet, getExamSummary, getBacklogs } from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", getExamSummary);
router.get("/get-marksheet", downloadMarksheet);
router.get("/get-back-papers", getBacklogs);
export default router;