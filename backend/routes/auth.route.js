import express from "express";
import {checkAuth, getCaptcha, login, logout} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getCaptcha);
router.get("/check-auth", checkAuth);
router.post("/login", login);
router.post("/logout", logout);

export default router;