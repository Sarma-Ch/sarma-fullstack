import express from "express";
import jwt from "jsonwebtoken";
import auth from "./middleware.js";

const app = express();
app.use(express.json());

app.get("/public", (req, res) => res.send("ok"));

app.get("/profile", auth, (req, res) => {
  res.json(req.user);
});

app.post("/login", (req, res) => {
  const token = jwt.sign({ id: 1 }, "secret");
  res.json({ token });
});

export default app;
