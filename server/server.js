import express from 'express';
import {config} from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import verifyUser from "./middlewares/authMiddleware.js";

config();

const app = express();

// connect to the database
connectDB();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', verifyUser, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
