import {
  createTask,
  getTasksByStatus,
  markTaskComplete,
  deleteTask,
} from "./tasks.repo";

async function run() {
  const userId = 1; 
  const task = await createTask(userId, "Learn PostgreSQL CRUD");
  console.log("Created:", task);

  const pending = await getTasksByStatus(false);
  console.log("Pending:", pending);

  const updated = await markTaskComplete(task.id);
  console.log("Updated:", updated);

  const deleted = await deleteTask(task.id);
  console.log("Deleted:", deleted);
}

run().catch(console.error);
