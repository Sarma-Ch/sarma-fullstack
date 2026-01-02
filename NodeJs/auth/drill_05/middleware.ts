import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith("Bearer ")) return res.sendStatus(401);

  try {
    req.user = jwt.verify(h.split(" ")[1], "secret");
    next();
  } catch {
    res.sendStatus(401);
  }
}
