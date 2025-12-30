import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "User list" });
});

export default userRouter;
