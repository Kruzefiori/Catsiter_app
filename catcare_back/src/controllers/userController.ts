import userService from "../services/userService";
import { Request, Response } from "express";

class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(400).json({
        error: "missing fields",
        fields: {
          email: email ? "ok" : "missing",
          name: name ? "ok" : "missing",
          password: password ? "ok" : "missing",
        },
      });

      return;
    }

    try {
      const user = await userService.registerUser(email, name, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: "missing fields",
        fields: {
          email: email ? "ok" : "missing",
          password: password ? "ok" : "missing",
        },
      });

      return;
    }
    try {
      const user = await userService.loginUser(email, password);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
