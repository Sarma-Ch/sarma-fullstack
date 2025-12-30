import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/ok", (req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});

app.post("/create", (req: Request, res: Response) => {
  res.status(201).json({ created: true, data: req.body });
});

app.get("/bad", (req: Request, res: Response) => {
  res.status(400).json({ error: "Bad Request" });
});

app.get("/not-found", (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.get("/headers", (req: Request, res: Response) => {
  res.set("X-Custom-Header", "MyHeaderValue");
  res.json({ message: "Custom header set" });
});
  
app.get("/json", (req: Request, res: Response) => {
  res.json({ type: "json response" });
});

app.get("/text", (req: Request, res: Response) => {
  res.send("Plain text response");
});

app.get("/file", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "sample.txt");
  res.sendFile(filePath);
});

app.get("/redirect", (req: Request, res: Response) => {
  res.redirect("/ok");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
