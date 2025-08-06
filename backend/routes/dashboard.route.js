import express from "express";
import { 
    avatar, 
    circulars, 
    companies, 
    dashboardCard, 
    exams, 
    getCircularDetails, 
    messages, 
    profile, 
    results, 
    workshops,
} from "../controllers/dashboard.controller.js";
import { checkSession } from "../middlewares/checkSession.middleware.js";
const router = express.Router();


router.use(checkSession);

router.get("/", profile);
router.get("/dashboard-card", dashboardCard);
router.get("/results", results);
router.get("/messages", messages);
router.get("/workshops", workshops);
router.get("/exams", exams);
router.get("/circulars", circulars);
router.get("/circulars-detail", getCircularDetails);
router.get("/companies", companies);
router.get("/avatar", avatar);

export default router;