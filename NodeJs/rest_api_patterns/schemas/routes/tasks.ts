import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";
import { validate } from "../middlewares/validate";
import { createTaskSchema, CreateTaskInput } from "../schemas/task.schema";

const router = Router();

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const tasks: Task[] = [];

router.post;
validate(createTaskSchema, "body"),
  (req: Request<{}, {}, CreateTaskInput>, res: Response) => {
    const { title } = req.body;

    const task: Task = {
      id: randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);

    res.status(201).json({ data: task });
  };
router.get(
  "/",
  validate(taskuQerychema, "query"),
  (req: Request, res: Response) => {
    const { limit = "10", offset = "0" } = req.query as {
      limit?: string;
      offset?: string;
    };

    res.json({
      data: tasks.slice(Number(offset), Number(offset) + Number(limit)),
    });
  }
);

export default router;
