import express from "express";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import catRoutes from "./routes/catRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cat", catRoutes);
app.use("/api/rate" , reviewRoutes)
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
