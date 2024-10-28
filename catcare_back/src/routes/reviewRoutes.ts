import express from "express";
import { auth } from "../middlewares/authMiddleware";
import reviewController from "../controllers/reviewController";

const router = express.Router();

router.post("/review", reviewController.addReview);
router.get("/review", auth, reviewController.getReviews);

export default router;
