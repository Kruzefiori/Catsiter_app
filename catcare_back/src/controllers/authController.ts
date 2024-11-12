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

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

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

	async googleLogin(req: Request, res: Response) {
		const { code } = req.body;
		if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
			throw new Error(
				"Google Client ID ou Secret ou URI de redirecionamento não estão definidos no .env"
			);
		}

		const oAuth2Client = new OAuth2Client(
			CLIENT_ID,
			CLIENT_SECRET,
			"postmessage"
		);
		try {
			const { tokens } = await oAuth2Client.getToken(code);
			oAuth2Client.setCredentials(tokens);

			const ticket = await oAuth2Client.verifyIdToken({
				idToken: tokens.id_token!,
				audience: CLIENT_ID,
			});

			const payload = ticket.getPayload();

			if (!payload?.email || !payload?.name || !payload?.sub) {
				res.status(400).send("Erro ao obter informações do usuário");
				return;
			}

			// Salvar ou atualizar o usuário no banco de dados
			const userData = await authService.googleSignIn(
				payload?.email,
				payload?.name,
				payload?.sub
			);

			res.json(userData);
		} catch (error) {
			console.error("Erro ao autenticar:", error);
			res.status(500).send("Erro ao salvar usuário no banco de dados");
		}
	}
}

export default new UserController();
