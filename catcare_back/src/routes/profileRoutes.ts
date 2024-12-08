import express from "express";
import { auth } from "../middlewares/authMiddleware";
import profileController from "../controllers/profileController";

const router = express.Router();

router.get("/user", auth, profileController.getProfile);
router.get("/catsitters", profileController.getAllCatSitters);
router.post("/onboarding", profileController.onboarding);


export default router;
