const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./backend/database/database.sqlite",
  logging: console.log, // enable logging for debug
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
};

module.exports = { sequelize, connectDB };
