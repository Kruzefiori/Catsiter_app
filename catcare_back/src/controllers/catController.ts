import { z, ZodError } from "zod";
import { Request, Response } from "express";
import catService from "../services/catService";

class catController {
    async addCat(req: Request, res: Response) {
        const schema = z.object({
            name: z.string(),
            gender: z.string(),
            age: z.number(),
            owner: z.number(),
            breed: z.string(),
            weight: z.number(),
        });
        try {
            schema.parse(req.body);
            const cat = await catService.addCat(req.body);
            res.status(200).json(cat);
        } catch (error) {
            if (error instanceof Error)
                res.status(400).json({ error: error.message });
        }
    }
}

export default new catController();


