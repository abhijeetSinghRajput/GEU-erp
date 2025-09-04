import express from "express";
import { 
    avatar, 
    profile, 
    getIdCard,
} from "../controllers/dashboard.controller.js";
import { checkSession } from "../middlewares/checkSession.middleware.js";
const router = express.Router();


router.use(checkSession);

router.get("/", profile);
router.get("/avatar", avatar);
router.get("/idcard", getIdCard);

export default router;