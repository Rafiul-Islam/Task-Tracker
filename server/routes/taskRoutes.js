import express from "express";
import {
  createTask,
  deleteTask,
  task,
  tasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/").get(tasks).post(createTask);

router.route("/:taskId").get(task).patch(updateTask).delete(deleteTask);

export default router;
