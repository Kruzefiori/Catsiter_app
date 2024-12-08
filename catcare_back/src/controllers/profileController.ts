import { Request, Response } from "express";
import { array, z, ZodError } from "zod";
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
      attendancePlaces: array(z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string(),
        complement: z.string().optional(),
        number: z.number().optional(),
      })),
  });
    try {
      schema.parse(req.body);
      const onboarding = await profileService.onboardingProfileCatsitter(req.body);
      res.status(200).json(onboarding);
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async getAllCatSitters(req: Request, res: Response) {
    try {
      const catSitters = await profileService.getAllCatSitters();
      res.status(200).json(catSitters);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}

export default new ProfileController();
