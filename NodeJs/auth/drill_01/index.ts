import { createUser, getUserByEmail } from "./userData";

const user = createUser({
  email: "sar123@gmail.com",
  passwordHash: "$3@$hashedpass",
});

console.log("Created user:", user);

const fetch = getUserByEmail("sar123@gmail.com");
console.log("Fetched the user:", fetch);
