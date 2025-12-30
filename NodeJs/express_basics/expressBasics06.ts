import "express-async-errors";
import express from "express";

const app = express();
app.get("/error", (req: Request, res: Response) => {
  throw new Error("Something went wrong");
});

import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });
};

app.use(errorHandler);

app.get("/async-error", async (req: Request, res: Response) => {
  throw new Error("Async error occurred");
});

const errorHandler1 = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};
