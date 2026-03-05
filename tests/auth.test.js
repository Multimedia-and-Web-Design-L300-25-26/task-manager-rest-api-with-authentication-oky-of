import request from "supertest";
import app from "../src/app.js";
import "./setupTestDB.js"; 

describe("Auth Routes", () => {

  let token;
  const uniqueEmail = `test${Date.now()}@example.com`; // unique every run

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: uniqueEmail,
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(uniqueEmail);
  });

  it("should login user and return token", async () => {
    // Make sure the user exists by registering again with the same unique email
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: uniqueEmail,
        password: "123456"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: uniqueEmail,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

});