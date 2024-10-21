import express from "express";
import catController from "../controllers/catController";

const router = express.Router();

router.post("/add-cat", catController.addCat);

export default router;