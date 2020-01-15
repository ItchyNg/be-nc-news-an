process.env.NODE_env = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require(".././app");
const connection = require("../db/connection");

after(() => connection.destroy());

describe("/api", () => {
  describe("/topics", () => {
    it("GET /: will respond with status 200", () => {
      return request(app)
        .get("/api/topics")
        .expect(200);
    });
    it("GET /: will return an array of objects with the required keys (description, slug)", () => {
      return request(app)
        .get("/api/topics")
        .then(result => {
          expect(result.body.topics).to.be.an("array");
          expect(result.body.topics[0]).to.be.an("object");
          expect(result.body.topics[0]).to.have.keys("description", "slug");
        });
    });
    it("GET /* : will return status 400 and msg: 'Bad Request'", () => {
      return request(app)
        .get("/api/topics/notValid")
        .expect(400)
        .then(result => {
          expect(result.body.msg).to.equal("Bad Request");
        });
    });
  });
  describe("/users", () => {
    it("GET /users/:username will respond with status 200", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200);
    });
    it("GET /users/:username will return an array of objects with the required keys (username, avatar_url, name)", () => {
      return request(app)
        .get("/api/users/lurker")
        .then(result => {
          expect(result.body.username).to.be.an("array");
          expect(result.body.username[0]).to.be.an("object");
          expect(result.body.username[0]).to.have.keys(
            "username",
            "avatar_url",
            "name"
          );
        });
    });
    it("GET /users/:notAValidUser :404, valid but non-existant Id ", () => {
      return request(app)
        .get("/users/notAValidUser")
        .expect(404)
        .then(errorResponse => {
          expect(errorResponse.body.msg).to.equal("Not a valid user");
        });
    });
  });
});
