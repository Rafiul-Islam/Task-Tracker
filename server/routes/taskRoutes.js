import express from 'express';
import {tasks} from "../controllers/taskController.js";

const router = express.Router();

router.route('/')
.get(tasks);

export default router;
