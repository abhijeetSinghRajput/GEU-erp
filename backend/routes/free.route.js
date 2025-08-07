import express from "express";
import { getFeeSubmissions } from "../controllers/fee.controller.js";

const router = express.Router();

router.get("/", getFeeSubmissions);
export default router;