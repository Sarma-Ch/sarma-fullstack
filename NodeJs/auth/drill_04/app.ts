import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = express();
app.use(express.json());

const JWT_SECRET = "super_secret_key";

export { JWT_SECRET };
