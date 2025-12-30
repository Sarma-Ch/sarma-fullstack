import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ userId: id });
});

app.get("/search", (req: Request, res: Response) => {
  const { q } = req.query;
  res.json({ query: q });
});

app.get("/users/:id/posts", (req: Request, res: Response) => {
  const { id } = req.params;
  const { limit } = req.query;

  const limNum = limit ? Number(limit) : null;

  res.json({
    userId: id,
    limit: limNum ?? "not provided",
  });
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("\nShutting Down...");
  server.close(() => process.exit(0));
});
