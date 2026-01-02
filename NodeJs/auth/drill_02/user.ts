import { hashPassword } from "./hashPass";
import { comparePassword } from "./hashPass";

async function run() {
  const user = {
    email: "abyz101@gmail.com",
    hashedPass: await hashPassword("broski456"),
  };
  console.log(await comparePassword("broski456", user.hashedPass));
  console.log(await comparePassword("broski123", user.hashedPass));
}
run();
