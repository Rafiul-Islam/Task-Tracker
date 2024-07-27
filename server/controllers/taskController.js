import Task from "../models/Task.js";

export async function tasks(req, res) {
  try {
    const userId = req.userId;
    const tasks = await Task.find({userId});
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).send({message: "Something went wrong."});
  }
}

export async function createTask(req, res) {
  try {
    const userId = req.userId;
    const body = req.body;

    if (!body.title.trim()) return res.status(400).send({message: 'Title is required.'});

    const {title, description, isCompleted} = body;
    const savedTask = await Task.create({userId, title, description, isCompleted});
    res.status(201).send(savedTask);
  } catch (error) {
    return res.status(500).send({message: "Something went wrong."});
  }
}
