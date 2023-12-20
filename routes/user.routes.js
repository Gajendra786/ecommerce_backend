import express from "express";
const router = express.Router();
import { test,list,getProfile, updateProfile } from "../controllers/user.controllers.js";
import { tokenCheck } from "../middelwares/auth.middelwares.js";

router.get("/test", tokenCheck, test);
router.get("/list", tokenCheck, list);
router.get("/profile", tokenCheck, getProfile);
router.put("/profile", tokenCheck, updateProfile);

export default router;