import request from "supertest";
import app, { server } from "../../app";
import envVars from "../../config/env";
import mongoose from "mongoose";

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
describe("Auth", () => {
  test("should login user if valid credentials are provided", async () => {
    await request(app)
      .post("/api/v1/auth/login")
      .send({ email: envVars.ADMIN_EMAIL, password: envVars.ADMIN_PASS })
      .expect(200);
  });

  it("should not login user if invalid credentials are provided", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "wrong email", password: "wrong password" })
      .expect(401);
    expect(response.body.success).toBe(false);
  });
});
