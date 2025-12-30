// const { version } = require("react");
require("dotenv").config();

console.log("Node.js is running....");

console.log("Process ID : ", process.pid);

console.log("Version ID is  : ", process.version);

console.log("Command Line Arguments  ", process.argv);

// process.exit(0);

// process.exit(1);

console.log("Current working directory:", process.cwd());

console.log("Environment Variables:", process.env);

console.log("API_KEY:", process.env.API_KEY);

const PORT = process.env.PORT || 3030;

console.log("PORT :", PORT);

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required variable : ${name} is missing`);
  }
  return value;
}
requireEnv("API_KEY");
