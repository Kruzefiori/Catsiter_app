import express from "express";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import catRoutes from "./routes/catRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cat", catRoutes);
app.use("/api/rate" , reviewRoutes)

// ------------- GOOGLE ----------- //
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
	throw new Error(
		"Google Client ID ou Secret ou URI de redirecionamento não estão definidos no .env"
	);
}

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, "postmessage");

app.post("/api/auth/google", async (req, res) => {
	const { code } = req.body;

	try {
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);

		const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
		const { data: userProfile } = await axios.get(googleUserInfoUrl, {
			headers: {
				Authorization: `Bearer ${tokens.access_token}`,
			},
		});

		// Retorna o token e os dados do perfil para o frontend
		res.json({
			tokens,
			userProfile,
		});
	} catch (error) {
		console.error("Erro durante o login do Google:", error);
		res.status(400).json(error);
	}
});

// ----------- FIM GOOGLE ----------- //

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
