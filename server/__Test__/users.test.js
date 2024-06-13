const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

// beforeAll(async () => {
//   await User.create({
//     email: "user1@example.com",
//     password: "password",
//   });
// });

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /api/users/register", () => {
  test("should return status 201 with user created", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "user1@example.com",
      password: "password",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", "user1@example.com");
  });

  test("should return status 400 with error message", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
});

describe("POST /api/users/login", () => {
  test("should return status 200 with access_token", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "user1@example.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("should return status 400 with error message", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
});

// describe("POST /api/users/login-google", () => {
//   test("should return status 200 with access_token", async () => {
//     const response = await request(app)
//       .post("/api/users/login-google")
//       .set("google_token", "valid-token");

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("access_token", expect.any(String));
//   });

//   test("should return status 400 with error message", async () => {
//     const response = await request(app).post("/api/users/login-google");

//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "Invalid token");
//   });
// });
