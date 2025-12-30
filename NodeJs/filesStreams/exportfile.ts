// app.ts
import express from "express";
import userRouter from "./routes/user.router";

const app = express();

app.use(express.json());

// mount router
app.use("/api/users", userRouter);

export default app;
