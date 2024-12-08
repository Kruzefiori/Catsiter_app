import e, { Request, Response } from "express";
import { array, z, ZodError } from "zod";
import bookingService from "../services/bookingService";
import { bookingStatus } from "@prisma/client";

class bookingController {

    //booking:
    async addBooking(req: Request, res: Response) {
        const schema = z.object({
            visits: array(z.object({
                visitDate: z.string(),
                status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
                notes: z.string().optional(),
                durationInMinutes: z.number(),
            })),
            requesterId: z.number(), // user who is requesting
            requestedId: z.number(), // user who is requested
            startDate: z.string(), // date and time of the service starts
            endDate: z.string(), // date and time of the service ends
            generalNotes: z.string().optional(),
        });
        try {
            schema.parse(req.body);
            const booking = await bookingService.createBooking(req.body);
            res.status(200).json(booking);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }

    async updateBooking(req: Request, res: Response) {
        const schema = z.object({
            visits: array(z.object({
                visitDate: z.string(),
                status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
                notes: z.string().optional(),
                durationInMinutes: z.number(),
            })).optional(),
            requesterId: z.number().optional(), // user who is requesting
            requestedId: z.number().optional(), // user who is requested
            startDate: z.string().optional(), // date and time of the service starts
            endDate: z.string().optional(), // date and time of the service ends
            generalNotes: z.string().optional(),
        });
        try {
            schema.parse(req.body);
            const booking = await bookingService.updateBooking(parseInt(req.params.bookingId), req.body);
            res.status(200).json(booking);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }

    async getBookingsRequester(req: Request, res: Response) {
        const userFind = parseInt(req.query.userId as string, 10) || 0;
        const status = req.query.status as bookingStatus || "PENDING";

        try {
            const bookings = await bookingService.getBookingByRequesterAndStatus(userFind, status);

            res.status(200).json(bookings);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }

    async getBookingsRequested(req: Request, res: Response) {
        const userFind = parseInt(req.query.userId as string, 10) || 0;
        const status = req.query.status as bookingStatus || "PENDING";

        try {
            const bookings = await bookingService.getBookingByRequestedAndStatus(userFind, status);
            res.status(200).json(bookings);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }

    async answerBooking(req: Request, res: Response) {
        const schema = z.object({
            bookingId: z.number(),
            answerBooking: z.enum(["ACCEPTED", "REJECTED"]),
        });
        try {
            schema.parse(req.body);
            const booking = await bookingService.answerBooking(req.body.bookingId , req.body.answerBooking);
            res.status(200).json(booking);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }

    //Visits:

    async getVisits(req: Request, res: Response) {
        try {
            const userId = Number(req.query.userId);
            const visits = await bookingService.getVisitsByBookingId(userId);
            res.status(200).json(visits);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }

    async answerVisit(req: Request, res: Response) {
        const schema = z.object({
            visitId: z.number(),
            visitNotes: z.string().optional(),
            status: z.enum(["DONE", "CANCELLED"]),
        });
        try {
            schema.parse(req.body);
            const visit = await bookingService.answerVisit(req.body);
            res.status(200).json(visit);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }

    async getBookingsWithVisitsByCatSitterId(req: Request, res: Response) {
        const catSitterId = parseInt(req.params.catSitterId, 10);
    
        try {
          const bookings = await bookingService.getBookingsWithVisitsByCatSitterId(catSitterId);
          res.status(200).json(bookings);
        } catch (error) {
          if (error instanceof Error) {
            res.status(400).json({ error: error.message });
          }
        }
    }
}

export default new bookingController()