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
