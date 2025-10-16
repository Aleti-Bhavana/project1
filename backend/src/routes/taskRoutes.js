// src/routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticate); // JWT required
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", authorize(["Admin"]), deleteTask);

export default router;
