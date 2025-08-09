import express from "express";
import { getFeeSubmissions, getFeeReceipts, downloadReceipt} from "../controllers/fee.controller.js";

const router = express.Router();

router.get("/", getFeeSubmissions);
router.get("/receipts", getFeeReceipts);
router.get("/download", downloadReceipt);

export default router;