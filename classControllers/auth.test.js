const request = require("supertest");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

const Auth = require("../classControllers/Auth");
const app = express();

const auth = new Auth();

describe("Authentification test", () => {
  app.use(cors());
  app.use(express.json());

  app.post("/users/signup", auth.signup);

  beforeAll(() => mongoose.connect(DB_HOST).then(() => app.listen(5000)));

  test("Signup test", async () => {
    const response = await request(app)
      .post("/users/signup")
      .send({ email: "email6@gmail.com", password: "12345678" });

    const { email, subscription } = response.body.data;
    expect(response.status).toBe(201);
    expect(typeof response.body).toBe("object");
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });
  // afterAll(() => server.close());
});
