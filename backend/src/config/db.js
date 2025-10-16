import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./backend/database/database.sqlite",
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
};
