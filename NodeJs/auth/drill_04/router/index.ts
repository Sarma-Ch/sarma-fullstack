import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app";

const app = express();
app.use(express.json());

interface User {
  id: number;
  email: string;
  password: string;
  role: "admin" | "user";
}

const users: User[] = [
  { id: 1, email: "admin@test.com", password: "1234", role: "admin" },
  { id: 2, email: "user@test.com", password: "1234", role: "user" },
];

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "10s",
    }
  );

  res.json({ token });
});
