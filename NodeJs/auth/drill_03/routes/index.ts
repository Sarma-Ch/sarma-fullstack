import { Router, Request, Response } from "express";
import { user } from "../dB.js";
import { comparePassword } from "../function-helper.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const users = user.find((u) => u.email === email);
  if (!users) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await comparePassword(password, users.password);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.json({ message: "Login successful" });
});

export default router;
