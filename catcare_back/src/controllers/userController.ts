import userService from '../services/userService';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

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

  async login(req: Request, res: Response): Promise<void> {
    const{email, password} = req.body;

    try {
      const login = await userService.loginUser(email, password);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }

    
  }
}

export default new UserController();