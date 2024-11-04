import express from "express";
import bookingController from "../controllers/bookingController";
import { auth } from "../middlewares/authMiddleware";

const router = express.Router();

//booking:
router.post("/add-booking",auth, bookingController.addBooking);
router.patch("/update-booking/:bookingId", auth, bookingController.updateBooking);
router.get("/get-bookings-requester", auth, bookingController.getBookingsRequester);
router.get("/get-bookings-requested", auth, bookingController.getBookingsRequested);
router.patch("/answer-booking", auth, bookingController.answerBooking);

//visit:
router.get("/visits", auth, bookingController.getVisits);
router.patch("/answer-visit", auth, bookingController.answerVisit);

export default router;