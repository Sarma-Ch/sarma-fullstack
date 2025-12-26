// // 4 . TS in Node
// console.log("This is a TypeScript file !");

// // 5. Debugging
// const Add = (a: number, b: number): number => {
//   debugger;
//   return a + b;
// };
// const sum = Add(2, 9);
// console.log(sum);

// const users = [
//   { id: 1, name: "Alice", role: "admin" },
//   { id: 2, name: "Bob", role: "user" },
// ];

// console.table(users);

// // function car() {
// //   throw new Error("The car crashed ");
// // }
// // function highway() {
// //   car();
// // }
// // highway();

// // 6.  Error Handling
// function syncError(a: number, b: number) {
//   if (a > b) {
//     try {
//       throw new Error("This is an error");
//     } catch (err: any) {
//       console.log("Error caught", err.message);
//     }
//   }
// }

// Promise.reject(new Error("This is rejected Promise")).catch((err) => {
//   console.log("Error is caught", err.message);
// });

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err.message);
//   process.exit(1);
// });

// setTimeout(() => {
//   throw new Error("Unexpected crash");
// }, 1000);

// process.on("unhandledRejection", (reason) => {
//   console.error("Unhandled Rejection:", reason);
//   process.exit(1);
// });

// Promise.reject("Unhandled promise error");

// function Exit(num: number) {
//   console.log("Stop and Exit");
//   process.exit(num);
// }
// try {
//   throw new Error("Fatal Error");
// } catch (error) {
//   if (error instanceof Error) console.log("Error Caught", error.message);
// }
// Exit(1);

import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

const PORT = 3000;
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Server is running\n");
  }
);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function shutdown(signal: string) {
  console.log(`Received ${signal}`);
  console.log("Shutting down server.");

  server.close(() => {
    console.log("Server-closed");
    console.log("goodbye");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Force exiting");
    process.exit(1);
  }, 5000);
}

process.on("SIGINT", () => shutdown("SIGINT"));

process.on("SIGTERM", () => shutdown("SIGTERM"));
