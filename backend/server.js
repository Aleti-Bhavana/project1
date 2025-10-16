import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

// DB & Server
connectDB();
sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
