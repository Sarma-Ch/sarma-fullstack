"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userData_1 = require("./userData");
const user = (0, userData_1.createUser)({
    email: "sar123@gmail.com",
    passwordHash: "$3@$hashedpass",
});
console.log("Created user:", user);
const fetch = (0, userData_1.getUserByEmail)("sar123@gmail.com");
console.log("Fetched the user:", fetch);
