import { Router, Request, Response } from "express";
import { validate } from "../../schemas/middlewares/validate";
import { taskQuerySchema } from "../schemas/task.query.schema";

const router = Router();

router.get(
  "/",
  validate(taskQuerySchema, "query"),
  (req: Request, res: Response) => {
    const { page, limit } = req.query as {
      page: number;
      limit: number;
    };

    const totalItems = tasks.length;
    const totalPages = Math.ceil(totalItems / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedTasks = tasks.slice(start, end);

    res.status(200).json({
      data: paginatedTasks,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  }
);

export default router;
