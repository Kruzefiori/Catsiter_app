import { Request, Response } from "express";
import { z, ZodError } from "zod";
import profileService from "../services/profileService";

class ProfileController {
  async getProfile(req: Request, res: Response) {
    const userId = req.body.userId;

    try {
      const user = await profileService.getProfile(userId);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async onboarding(req: Request, res: Response) {
    const schema = z.object({
      userId: z.number(),
      jobDesc: z.string(),
      rating: z.number(),
      price: z.number(),
  });
    try {
      schema.parse(req.body);
      const onboarding = await profileService.onboardingProfile_catsitter(req.body);
      res.status(200).json(onboarding);
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async addReview(req: Request, res: Response) {
    const schema = z.object({
      userId: z.number(),
      rate: z.number(),
      review: z.string(),
    });
    try {
      schema.parse(req.body);
      const rating = await profileService.addReview(req.body);
      res.status(200).json(rating);
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async getReviews(req: Request, res: Response) {

    const userFind = parseInt(req.query.userId as string, 10) || 0;

    try {
      const reviews = await profileService.getReviews(userFind);

      res.status(200).json(reviews);
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

}

export default new ProfileController();
