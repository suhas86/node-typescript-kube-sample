import request from "supertest";
import { app } from "../../app";

it("Should not allow to create user without first name", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      lastName: "Abc",
      email: "abc@example.com",
      password: "12345678",
      confirmPassword: "12345678",
    })
    .expect(400);
});

it("Should not allow to create user with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      lastName: "Xyz",
      email: "abc@example",
      password: "12345678",
      confirmPassword: "12345678",
    })
    .expect(400);
});

it("Should not allow to create user with invalid password. Has to be minimum of 6", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      lastName: "Xyz",
      email: "abc@example.com",
      password: "123",
      confirmPassword: "123",
    })
    .expect(400);
});

it("Should not allow to create user without email id and password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      lastName: "Xyz",
      confirmPassword: "12345678",
    })
    .expect(400);
});

it("Should not allow to create user without same password and confirm password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      lastName: "Xyz",
      email: "abc@example.com",
      password: "12345678",
      confirmPassword: "123456",
    })
    .expect(400);
});

it("Should not allow to create user with same email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      lastName: "Xyz",
      email: "abc@example.com",
      password: "12345678",
      confirmPassword: "12345678",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      lastName: "Xyz",
      email: "abc@example.com",
      password: "12345678",
      confirmPassword: "12345678",
    })
    .expect(400);
});

it("Should allow to create user with proper first name, last name  email, password and confirm password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      lastName: "Xyz",
      email: "abc@example.com",
      password: "12345678",
      confirmPassword: "12345678",
    })
    .expect(201);
});

it("Should allow to create user without last name", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Abc",
      email: "abc@example.com",
      password: "12345678",
      confirmPassword: "12345678",
    })
    .expect(201);
});
