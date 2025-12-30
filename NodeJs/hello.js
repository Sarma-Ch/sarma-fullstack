"use strict";
// // 4 . TS in Node
// console.log("This is a TypeScript file !");
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
const http = __importStar(require("http"));
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Server is running\n");
});
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
function shutdown(signal) {
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
