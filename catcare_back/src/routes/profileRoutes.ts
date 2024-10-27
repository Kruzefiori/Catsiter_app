import express from "express";
import { auth } from "../middlewares/authMiddleware";
import profileController from "../controllers/profileController";

const router = express.Router();

router.get("/me", auth, profileController.getProfile);
router.post("/onboarding", profileController.onboarding);
router.post("/rating", profileController.catsitterRating);
router.get("/reviews", profileController.getReviews);

export default router;
