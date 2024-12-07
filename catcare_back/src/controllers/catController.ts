import { z, ZodError } from "zod";
import { Request, Response } from "express";
import catService, { catUpdate } from "../services/catService";

class catController {
	async getCats(req: Request, res: Response) {
		const userId = Number(req.body.userId);
		try {
			const cats = await catService.getCats(userId);
			res.status(200).json(cats);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			}
		}
	}

	async addCat(req: Request, res: Response) {
		const schema = z.object({
			name: z.string(),
			gender: z.string(),
			age: z.number(),
			owner: z.number(),
			breed: z.string(),
			weight: z.number(),
			castrated: z.boolean(),
			conditions: z.string(),
			protectionScreen: z.boolean(),
			streetAccess: z.boolean(),
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

	async updateCat(req: Request, res: Response) {
		const catId = Number(req.params.id);
		const data: catUpdate = req.body;
		const userId = Number(req.query.userId);

		try {
			const updatedCat = await catService.updateCat(catId, userId, data);
			res.status(200).json(updatedCat);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			}
		}
	}

	async deleteCat(req: Request, res: Response) {
		const catId = Number(req.params.id);
		const userId = Number(req.query.userId);
		try {
			await catService.deleteCat(catId, userId);
			res.status(204).send();
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			}
		}
	}
}

export default new catController();
