import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "super_secret_key";

export interface AuthRequest extends Request {
  user?: jwt.JwtPayload | string;
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is  missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: err.message });
    }

    req.user = decoded;
    next();
  });
}
