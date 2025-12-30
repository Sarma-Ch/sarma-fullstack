import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "User list" });
});

export default userRouter;
