import authService from "../services/authService";
import { z, ZodError } from "zod";
import { Request, Response } from "express";

class UserController {
  async signUp(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const signUpSchema = z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(8),
    });

    try {
      signUpSchema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError)
        res.status(400).json({ error: error.errors });
      return;
    }

    try {
      await authService.signUp(email, name, password);
      res.status(201).json({
        message: "user created",
        detail: {
          email,
        },
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const signInSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    try {
      signInSchema.parse(req.body);
    } catch (error: any) {
      if (error instanceof ZodError)
        res.status(400).json({ error: error.errors });
      return;
    }

    try {
      const token = await authService.signIn(email, password);

      res.status(200).json({ token, expiresIn: "7d" });
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
