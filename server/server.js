import express from 'express';
import {config} from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";

config();

const app = express();

// connect to the database
connectDB();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
