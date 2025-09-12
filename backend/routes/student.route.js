import express from "express";
import {
  avatar,
  profile,
  getIdCard,
  updateAvatar,
  forgotPassword,
  getLoginId,
} from "../controllers/student.controller.js";
import { checkSession } from "../middlewares/checkSession.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/get-loginid", getLoginId);

router.get("/", checkSession, profile);
router.get("/avatar", checkSession, avatar);
router.get("/idcard", checkSession, getIdCard);
router.post(
  "/upload-avatar",
  checkSession,
  upload.single("file"),
  updateAvatar
);

export default router;
