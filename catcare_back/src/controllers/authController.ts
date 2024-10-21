import authService from "../services/authService";
import { z, ZodError } from "zod";
import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import axios from "axios";

type UserProfile = {
	email: string;
	family_name: string;
	given_name: string;
	id: string;
	name: string;
	picture: string;
	verified_email: boolean;
};

class UserController {
	private oAuth2Client: OAuth2Client;
	constructor() {
		const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
		const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
		const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
		if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
			throw new Error(
				"Google Client ID ou Secret ou URI de redirecionamento não estão definidos no .env"
			);
		}

		this.oAuth2Client = new OAuth2Client(
			CLIENT_ID,
			CLIENT_SECRET,
			"postmessage"
		);
	}

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

	async googleLogin(req: Request, res: Response) {
		const { code } = req.body;

		try {
			const { tokens } = await this.oAuth2Client.getToken(code);
			this.oAuth2Client.setCredentials(tokens);

			const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
			const { data: userProfile } = await axios.get<UserProfile>(
				googleUserInfoUrl,
				{
					headers: {
						Authorization: `Bearer ${tokens.access_token}`,
					},
				}
			);

			const googleUser = {
				email: userProfile.email,
				name: userProfile.name,
			};

			const signUpSchema = z.object({
				email: z.string().email(),
				name: z.string(),
			});

			try {
				signUpSchema.parse(googleUser);
			} catch (error) {
				if (error instanceof ZodError)
					res.status(400).json({ error: error.errors });
				return;
			}

			try {
				// await authService.saveGoogleUser(googleUser.email, googleUser.name);
				res.status(200).json({
					message: "google user saved",
					detail: googleUser,
				});
			} catch (error) {
				if (error instanceof Error)
					res.status(400).json({ error: error.message });
			}

			// Retorna o token e os dados do perfil para o frontend
			res.json({
				tokens,
			});
		} catch (error) {
			console.error("An error occurred on google login:", error);
			res.status(400).json(error);
		}
	}
}

export default new UserController();
