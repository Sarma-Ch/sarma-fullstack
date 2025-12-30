import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    data: [
      {
        id: "123",
        title: "API doc",
        completed: false,
        userId: "42",
        createdAt: "2025-01-10T09:00:00Z",
      },
    ],
    meta: {
      total: 1,
      limit: 20,
      offset: 0,
    },
  });
});

router.post("/", (req, res) => {
  const { title, userId } = req.body;

  res.status(201).json({
    data: {
      id: "124",
      title,
      completed: false,
      userId,
      createdAt: new Date().toISOString(),
    },
  });
});

export default router;
