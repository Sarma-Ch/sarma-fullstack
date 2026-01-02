import request from "supertest";
import jwt from "jsonwebtoken";
import app from "./index.js";

const token = jwt.sign({ id: 1 }, "secret");

test("public works", async () => {
  await request(app).get("/public").expect(200);
});

test("profile without token = 401", async () => {
  await request(app).get("/profile").expect(401);
});

test("profile with token = 200", async () => {
  await request(app)
    .get("/profile")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});
