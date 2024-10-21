import express from "express";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import catRoutes from "./routes/catRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cat", catRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
