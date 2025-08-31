import express from "express";
import { 
    avatar, 
    exams, 
    messages, 
    profile, 
} from "../controllers/dashboard.controller.js";
import { checkSession } from "../middlewares/checkSession.middleware.js";
const router = express.Router();


router.use(checkSession);

router.get("/", profile);
router.get("/avatar", avatar);

export default router;