import express from "express";
import { getExamDetails, getExamSummary } from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", getExamSummary);
router.get("/get-details", getExamDetails);
export default router;