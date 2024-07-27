import express from 'express';
import {config} from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";

config();

const app = express();

// connect to the database
connectDB();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
