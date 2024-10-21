import { Request, Response } from "express";
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
}

export default new ProfileController();
