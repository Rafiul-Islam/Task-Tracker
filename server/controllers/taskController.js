import Task from "../models/Task.js";

export async function tasks(req, res) {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong." });
  }
}

export async function createTask(req, res) {
  try {
    const userId = req.userId;
    const body = req.body;

    if (!body.title)
      return res.status(400).send({ message: "Title is required." });

    const { title, description, isCompleted } = body;
    const savedTask = await Task.create({
      userId,
      title,
      description,
      isCompleted,
    });
    return res.status(201).send(savedTask);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function updateTask(req, res) {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;

    const body = req.body;

    const task = await Task.findOne({
      _id: taskId,
      userId,
    });

    if (!task) return res.status(404).send({ message: "Task not found" });

    const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
    });

    return updatedTask
      ? res.status(201).send(updatedTask)
      : res.status(400).send({ message: "Task update Failed." });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong." });
  }
}

export async function deleteTask(req, res) {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;

    await Task.findOneAndDelete({
      _id: taskId,
      userId,
    })
      .then((task) => {
        if (task)
          return res
            .status(200)
            .send({ message: "Task deleted successfully." });
        else return res.status(404).send({ message: "Task does not exist." });
      })
      .catch(() => {
        return res.status(400).send({ message: "Task does not exist." });
      });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
  }
}
