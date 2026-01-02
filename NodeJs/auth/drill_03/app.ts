import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

const SALT_ROUNDS = 12;

