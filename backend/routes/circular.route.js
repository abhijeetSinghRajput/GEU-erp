import express from "express";

import { circulars, getCircularDetails } from "../controllers/circular.controller.js";
import { checkSession } from "../middlewares/checkSession.middleware.js";
const router = express.Router();

router.use(checkSession);
router.get("/", circulars);
router.get("/circulars-detail", getCircularDetails);

export default router;
