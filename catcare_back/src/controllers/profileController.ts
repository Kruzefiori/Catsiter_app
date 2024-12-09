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
		const isCatsitter = req.body.type === "SITTER";

		const sitterSchema = z.object({
			userId: z.number(),
			jobDesc: z.string(),
			price: z.number(),
			attendancePlaces: array(z.string()),
			address: z.object({
				street: z.string(),
				city: z.string(),
				state: z.string(),
				zipCode: z.string(),
				country: z.string(),
				complement: z.string().optional(),
				number: z.number().optional(),
			}),
		});

		const ownerSchema = z.object({
			userId: z.number(),
			address: z.object({
				street: z.string(),
				city: z.string(),
				state: z.string(),
				zipCode: z.string(),
				country: z.string(),
				complement: z.string().optional(),
				number: z.number().optional(),
			}),
		});

		try {
			if (isCatsitter) {
				sitterSchema.parse(req.body);
				const onboarding = await profileService.onboardingProfileCatsitter(
					req.body
				);
				res.status(200).json(onboarding);
			} else {
				ownerSchema.parse(req.body);
				const onboarding = await profileService.onboardingProfileOwner(
					req.body
				);
				res.status(200).json(onboarding);
			}
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

	async getOwnerById(req: Request, res: Response) {
		const ownerId = req.query.ownerId as string;

		console.log("ownerId", ownerId);
		try {
			const owner = await profileService.getOwnerById(Number(ownerId));
			res.status(200).json(owner);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			}
		}
	}
}

export default new ProfileController();
