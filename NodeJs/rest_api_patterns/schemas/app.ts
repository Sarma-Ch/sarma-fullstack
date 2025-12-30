import express from "express";
import tasksRoutes from "./routes/tasks";

const app = express();

app.use(express.json());
app.use("/tasks", tasksRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
