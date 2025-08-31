import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";
import { swaggerUi, swaggerDocs } from "./swagger.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/tasks", protect, taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
