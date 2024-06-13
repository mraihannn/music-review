const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

beforeAll(async () => {
  await User.create({
    email: "user1@example.com",
    password: "password",
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /api/music/search", () => {
  test("should return status 200 with array of music", async () => {
    const response = await request(app).get("/api/music/search").query({
      q: "taylor swift",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  test("should return status 400 with error message", async () => {
    const response = await request(app).get("/api/music/search").query({
      q: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Query is required");
  });
});
