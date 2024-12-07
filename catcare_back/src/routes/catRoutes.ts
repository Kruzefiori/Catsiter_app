import express from "express";
import catController from "../controllers/catController";
import { auth } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/get-cats", auth, catController.getCats);
router.post("/add-cat", catController.addCat);
router.patch("/update-cat/:id", auth, catController.updateCat);
router.delete("/delete-cat/:id", auth, catController.deleteCat);

export default router;
