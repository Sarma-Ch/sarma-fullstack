import { getTasksByUser, getTasksWithUserEmail } from "./tasks.repo";

async function run() {
  const sarmaTasks = await getTasksByUser(1);
  console.log("Sarma's tasks:", sarmaTasks);

  const tasksWithEmail = await getTasksWithUserEmail();
  console.log("Tasks with emails:", tasksWithEmail);
}

run().catch(console.error);
