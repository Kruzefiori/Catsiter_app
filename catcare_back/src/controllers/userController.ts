import userService from '../services/userService';
import { Request, Response } from 'express';

class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const { email, name, password } = req.body;

    try {
      const user = await userService.registerUser(email, name, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();