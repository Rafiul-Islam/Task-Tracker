import express from 'express';
import {createTask, tasks} from "../controllers/taskController.js";

const router = express.Router();

router.route('/')
.get(tasks)
.post(createTask);

export default router;
