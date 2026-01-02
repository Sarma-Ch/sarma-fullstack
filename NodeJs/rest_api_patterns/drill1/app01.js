import express from "express";
import tasksRoutes from "./drill1/tasks01.js";
import usersRoutes from "./drill1/users01.js";

const app = express();

app.use(express.json());

app.use("/tasks01", tasksRoutes);
app.use("/users01", usersRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
