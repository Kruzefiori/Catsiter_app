import e, { Request, Response } from "express";
import { z, ZodError } from "zod";
import  reviewService  from "../services/reviewService";

class reviewController {
    async addReview(req: Request, res: Response) {
        const schema = z.object({
          userId: z.number(),
          rate: z.number(),
          review: z.string(),
        });
        try {
          schema.parse(req.body);
          const rating = await reviewService.addReview(req.body);
          res.status(200).json(rating);
        } catch (error) {
          if (error instanceof Error)
            res.status(400).json({ error: error.message });
        }
      }
    
      async getReviews(req: Request, res: Response) {
    
        const userFind = parseInt(req.query.userId as string, 10) || 0;
    
        try {
          const reviews = await reviewService.getReviews(userFind);
    
          res.status(200).json(reviews);
        } catch (error) {
          if (error instanceof Error)
            res.status(400).json({ error: error.message });
        }
      }
    
}
export default new reviewController();