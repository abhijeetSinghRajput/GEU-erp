import express from "express";
import { 
    avatar, 
    profile, 
    getIdCard,
    updateAvatar,
} from "../controllers/dashboard.controller.js";
import { checkSession } from "../middlewares/checkSession.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();


router.use(checkSession);

router.get("/", profile);
router.get("/avatar", avatar);
router.get("/idcard", getIdCard);
router.post("/upload-avatar", upload.single("file"), updateAvatar);

export default router;