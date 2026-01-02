"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashPass_1 = require("./hashPass");
const hashPass_2 = require("./hashPass");
async function run() {
    const user = {
        email: "abyz101@gmail.com",
        hashedPass: await (0, hashPass_1.hashPassword)("broski456"),
    };
    console.log(await (0, hashPass_2.comparePassword)("broski456", user.hashedPass));
    console.log(await (0, hashPass_2.comparePassword)("broski123", user.hashedPass));
}
run();
