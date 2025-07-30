import express from "express";
import { 
    avatar, 
    circulars, 
    companies, 
    dashboardCard, 
    exams, 
    messages, 
    profile, 
    results, 
    workshops 
} from "../controllers/dashboard.controller.js";
const router = express.Router();


router.get("/", profile);
router.get("/dashboard-card", dashboardCard);
router.get("/results", results);
router.get("/messages", messages);
router.get("/workshops", workshops);
router.get("/exams", exams);
router.get("/circulars", circulars);
router.get("/companies", companies);
router.get("/avatar", avatar);

export default router;