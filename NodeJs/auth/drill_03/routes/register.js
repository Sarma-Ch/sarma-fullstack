import { Router } from "express";
import { user } from "../dB";
import { hashPassword } from "../function_helper";
const router = Router();
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }
    const existingUser = user.find((u) => u.email === email);
    if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
    }
    const passwordHash = await hashPassword(password);
    user.push({
        email,
        password,
    });
    return res.status(201).json({ message: "User registered successfully" });
});
export default router;
