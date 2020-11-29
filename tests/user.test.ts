import { assert } from "chai";
import { describe } from "mocha";
import request from "supertest";
import app from "../src";
import modelInit from "../src/models";
import User from "../src/models/user.model";

const baseUrl = "/api/v1";

describe("User API Test", () => {
  before(async () => {
    modelInit();
  });

  beforeEach(async () => {
    await User.truncate();
  });

  describe("User post", () => {
    it("create user", async () => {
      const res = await request(app).post(`${baseUrl}/users`).send({
        username: "string",
        password: "string",
        firstName: "string",
        lastName: "string",
        avatarUrl: "string",
        roleId: 0
      });
      assert.strictEqual(res.status, 200, "this will ok");
      assert.include(
        res.body.data,
        { username: "string" },
        "success saved user"
      );
    });
  });
});
