import mongoose from "mongoose";
import {config} from "dotenv";

config();

function connectDB() {
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
}

export default connectDB;
