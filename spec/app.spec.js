process.env.NODE_env = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require(".././app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it("404: Invalid route, we are testing for routes that are not valid", () => {
    return request(app)
      .get("/api/invalidRoute")
      .expect(404)
      .then(errorResult => {
        expect(errorResult.body.msg).to.equal("Route not found");
      });
  });
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
          expect(result.body.username).to.be.an("object");
          expect(result.body.username).to.have.keys(
            "username",
            "avatar_url",
            "name"
          );
        });
    });
    it("GET /users/:notAValidUser :404, valid but non-existant Id ", () => {
      return request(app)
        .get("/api/users/notAValidUser")
        .expect(404)
        .then(errorResponse => {
          expect(errorResponse.body.msg).to.equal("Not a valid user");
        });
    });
  });
  describe("/articles", () => {
    describe("/GET", () => {
      //NEED TO DO SOME ERROR HANDLING!!!!
      it("GET /articles/:articles_id will respond with status 200", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200);
      });
      it("GET /articles/:articles_id should be return in the correct format and include the appropriate key columns", () => {
        return request(app)
          .get("/api/articles/1")
          .then(result => {
            expect(result.body.article).to.be.an("object");
            expect(result.body.article).to.have.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("GET /articles/:articles_id will respond with just the article_id searched for", () => {
        return request(app)
          .get("/api/articles/1")
          .then(result => {
            expect(result.body.article.comment_count).to.equal(13);
            expect(result.body.article.article_id).to.equal(1);
          });
      });
      it("GET /articles/:articles_id will respond with just the article_id searched for", () => {
        return request(app)
          .get("/api/articles/5")
          .then(result => {
            expect(result.body.article.comment_count).to.equal(2);
            expect(result.body.article.article_id).to.equal(5);
          });
      });
    });
    describe.only("/PATCH", () => {
      it("PATCH /articles/:articles_id will return status 200 when successful", () => {
        let newVote = 1;

        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: newVote })
          .expect(200);
      });
      it("PATCH /articles/:articles_id will return the article request with the amended vote count", () => {
        let newVote = 1;

        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: newVote })
          .expect(200);
      });
    });
  });
});
