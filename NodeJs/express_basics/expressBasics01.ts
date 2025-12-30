import express from "express";
const app = express();
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello Express");
});

const PORT = process.env.PORT || 3000;

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
