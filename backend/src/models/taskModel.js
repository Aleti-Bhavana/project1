import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./userModel.js";

export const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
});

// Relationships
Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });
