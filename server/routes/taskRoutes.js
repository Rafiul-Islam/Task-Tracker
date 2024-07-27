import express from 'express';
import {createTask, deleteTask, tasks} from "../controllers/taskController.js";

const router = express.Router();

router.route('/')
.get(tasks)
.post(createTask);

router.route('/:id')
.delete(deleteTask);

export default router;
