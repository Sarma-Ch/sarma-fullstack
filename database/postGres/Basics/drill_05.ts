import { createUser } from "./user";

async function run() {
  const result = await createUser("taylorSwift@gmail.com");
  console.log("RESULT:", result);
}

run();
