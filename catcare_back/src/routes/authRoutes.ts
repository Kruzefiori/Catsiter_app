import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/google", authController.googleLogin);

export default router;
