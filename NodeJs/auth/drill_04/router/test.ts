app.get("/test", authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({
    message: "JWT is valid",
    user: req.user,
  });
});
