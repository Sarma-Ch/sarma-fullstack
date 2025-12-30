import express from "express";
import tasksRouter from "./tasks.js";

const app = express();

app.use(express.json());

// mount router
app.use("/tasks", tasksRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
