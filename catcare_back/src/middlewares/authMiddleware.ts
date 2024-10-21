import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET not defined");
      res.status(401).json({ error: "unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      res.status(401).json({ error: "unauthorized" });
    }

    if (typeof decoded !== "string" && "id" in decoded) {
      req.body.userId = decoded.id;
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "unauthorized" });
  }
}
