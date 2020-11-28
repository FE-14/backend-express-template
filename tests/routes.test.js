/* eslint-disable @typescript-eslint/no-var-requires */
const request = require("supertest");
const app = require("../dist/index");

describe("Api Test", () => {
  it("Try Welcome ", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});