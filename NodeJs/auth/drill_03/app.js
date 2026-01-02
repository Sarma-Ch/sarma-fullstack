import express from "express";
const app = express();
app.use(express.json());
const SALT_ROUNDS = 12;
