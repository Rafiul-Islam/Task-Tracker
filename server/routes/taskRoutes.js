import express from 'express';
import {createTask, deleteTask, tasks, updateTask} from "../controllers/taskController.js";

const router = express.Router();

router.route('/')
.get(tasks)
.post(createTask);

router.route('/:id')
.patch(updateTask)
.delete(deleteTask);

export default router;
