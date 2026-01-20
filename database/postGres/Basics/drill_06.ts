import { getUser } from "./user";
import { createTask, getUserTasks } from "./tasks.repo";

async function run() {
  const user = await getUser(1);
  console.log("USER:", user);

  if (!user) return;

  const task = await createTask(user.id, "Drills Done");
  console.log("CREATED TASK:", task);

  const tasks = await getUserTasks(user.id);
  console.log("USER TASKS:", tasks);
}

run();
