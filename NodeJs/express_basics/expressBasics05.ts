import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[TIME] ${req.method} ${req.url} - ${duration}ms`);
  });

  next();
});

import crypto from "crypto";

app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = crypto.randomUUID();

  (req as any).requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
});

app.get("/test", (req, res) => {
  res.json({ requestId: (req as any).requestId });
});

const Middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth middleware executed");
  next();
};

app.get("/private", Middleware, (req, res) => {
  res.send("Private route");
});

app.use((req: any, res, next) => {
  console.log("Global Logger");
  req.startTime = Date.now();
  next();
});
app.all("*", (req: any, res, next) => {
  console.log("All Paths");
  next();
});
app.get(
  "/users",
  (req: any, res, next) => {
    console.log(" Users Auth");
    next();
  },
  (req: any, res) => {
    console.log(" Users Handler");
    res.json({ time: Date.now() - req.startTime });
  }
);
