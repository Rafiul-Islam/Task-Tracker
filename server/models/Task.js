import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Task = mongoose.model('Tasks', taskSchema);

export default Task;
