import express from "express";
import { randomUUID } from "crypto";

const router = express.Router();

const tasks = [];

router.get("/", (req, res) => {
  res.status(200).json({
    data: tasks,
  });
});

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: {
        message: "Title is not there",
      },
    });
  }

  const newTask = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  res.status(201).json({
    data: newTask,
  });
});

router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      error: {
        message: "Task not found",
      },
    });
  }

  res.status(200).json({
    data: task,
  });
});

router.put("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: {
        message: "Task not found",
      },
    });
  }

  const { title, completed } = req.body;

  if (title === undefined || completed === undefined) {
    return res.status(400).json({
      error: {
        message: "Both title and completed are required for PUT",
      },
    });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title,
    completed,
    updatedAt: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;

  res.status(200).json({
    data: updatedTask,
  });
});

router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: {
        message: "Task not found",
      },
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

export default router;
