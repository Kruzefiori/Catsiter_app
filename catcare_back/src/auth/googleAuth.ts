import express from "express";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import * as dotenv from "dotenv";
import cors from "cors";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Acessar as variáveis de ambiente
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// Verificar se as variáveis estão definidas
if (!CLIENT_ID || !CLIENT_SECRET) {
	throw new Error("Google Client ID ou Secret não estão definidos no .env");
}

// Crie uma instância do cliente OAuth2
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.post("/auth/google", async (req, res) => {
	const { tokens } = await client.getToken(req.body.code); // exchange code for tokens
	console.log(tokens);
	res.json(tokens);
});

app.get("/", (req, res) => {
	res.send(`
    <h1>Bem-vindo ao Sistema de Autenticação</h1>
    <p><a href="/loginGoogle">Clique aqui para fazer login com Google</a></p>
  `);
});

// Rota para redirecionar o usuário para o Google para autenticação
app.get("/loginGoogle", (req, res) => {
	const authorizeUrl = client.generateAuthUrl({
		access_type: "offline",
		scope: ["https://www.googleapis.com/auth/userinfo.profile"],
	});
	res.redirect(authorizeUrl);
});

// Rota de redirecionamento após a autenticação no Google
app.get("/auth/callback", async (req, res) => {
	const code = req.query.code as string;

	try {
		// Troca o código de autorização por tokens de acesso
		const { tokens } = await client.getToken(code);
		client.setCredentials(tokens);

		// Aqui você pode acessar o token e usar para acessar dados do usuário
		res.send("Autenticação bem-sucedida! Token: " + JSON.stringify(tokens));
	} catch (error) {
		console.error("Erro ao autenticar:", error);
		res.status(500).send("Erro durante o processo de autenticação");
	}
});

