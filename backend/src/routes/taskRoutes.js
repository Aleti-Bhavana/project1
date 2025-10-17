const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);

router.delete("/:id", async (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Forbidden: Only Admin can delete tasks" });
  }
  next();
}, deleteTask);



module.exports = router;
