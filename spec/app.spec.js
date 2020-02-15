process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require(".././app");
const connection = require("../db/connection");
const chaiSorted = require("chai-sorted");

chai.use(chaiSorted);

describe("/api", function() {
  this.timeout(15000);
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  // it("200: returns status 200 when successful and an object with api descriptions", () => {
  //   return request(app)
  //     .get("/api")
  //     .expect(200)
  //     .then(result => {
  //       expect(result).to.be.an("object");
  //     });
  // });
  it("404: Invalid route, we are testing for routes that are not valid", () => {
    return request(app)
      .get("/api/invalidRoute")
      .expect(404)
      .then(errorResult => {
        expect(errorResult.body.msg).to.equal("Route Not Found");
      });
  });
  it("405: Invalid method, we are testing for methods from the /api that are not valid", () => {
    return request(app)
      .delete("/api")
      .expect(405)
      .then(result => {
        expect(result.body.msg).to.equal("Method Not Found");
      });
  });
  describe("/topics", () => {
    it("GET /: will return status 200 and an array of objects with the required keys (description, slug)", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(result => {
          expect(result.body.topics).to.be.an("array");
          expect(result.body.topics[0]).to.be.an("object");
          expect(result.body.topics[0]).to.have.keys("description", "slug");
        });
    });
    it("GET /* : will return status 400 and msg: 'Bad Request'", () => {
      return request(app)
        .get("/api/topics/notValid")
        .expect(404)
        .then(result => {
          expect(result.body.msg).to.equal("Route Not Found");
        });
    });
    it("POST /* :405 when other methods are attempted'", () => {
      return request(app)
        .post("/api/topics")
        .send({ hello: "hello" })
        .expect(405)
        .then(result => {
          expect(result.body.msg).to.equal("Method Not Found");
        });
    });
    it("PATCH /* :405 when other methods are attempted'", () => {
      return request(app)
        .patch("/api/topics")
        .send({ hello: "hello" })
        .expect(405)
        .then(result => {
          expect(result.body.msg).to.equal("Method Not Found");
        });
    });
    it("DELETE /* :405 when other methods are attempted'", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(result => {
          expect(result.body.msg).to.equal("Method Not Found");
        });
    });
  });
  describe("/users", () => {
    it("GET 200 /users/:username will respond with status 200 and an array of objects with the required keys (username, avatar_url, name)", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(result => {
          expect(result.body.user).to.be.an("object");
          expect(result.body.user).to.have.keys(
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
    it("PATCH /* :405 when other methods are attempted'", () => {
      return request(app)
        .patch("/api/users/lurker")
        .send({ hello: "hello" })
        .expect(405)
        .then(result => {
          expect(result.body.msg).to.equal("Method Not Found");
        });
    });
    it("POST /* :405 when other methods are attempted'", () => {
      return request(app)
        .put("/api/users/lurker")
        .send({ hello: "hello" })
        .expect(405)
        .then(result => {
          expect(result.body.msg).to.equal("Method Not Found");
        });
    });
    it("DELETE /* :405 when other methods are attempted'", () => {
      return request(app)
        .delete("/api/users/lurker")
        .expect(405)
        .then(result => {
          expect(result.body.msg).to.equal("Method Not Found");
        });
    });
  });

  describe("/articles", () => {
    describe("/articles GET", () => {
      it("GET 200, will return status 200 when successful, be an array of objects and have the appropriate keys", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.be.an("array");
            expect(result.body.articles[0]).to.be.an("object");
            expect(result.body.articles[0]).to.have.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("GET 200, sort_by should default to date and the order should default to descending", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET 200, data should be sort_by article_id on request and the order should default to descending", () => {
        return request(app)
          .get("/api/articles?sort_by=article_id")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.be.sortedBy("article_id", {
              descending: true
            });
          });
      });
      it("GET 200, sort_by should default to date and the order should be asc on request", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.be.sortedBy("created_at", {
              descending: false
            });
          });
      });
      it("GET 200, sort_by should title on request and the order should be asc on request", () => {
        return request(app)
          .get("/api/articles?sort_by=title&order=asc")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.be.sortedBy("title", {
              descending: false
            });
          });
      });
      it("GET 200, returns all the articles by an author, sort_by should sort by article_id by request and the order should default to descending", () => {
        return request(app)
          .get("/api/articles?author=icellusedkars&sort_by=article_id")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.be.descendingBy("article_id"); //DOES NOT LIKE BEING SORTED BY DATE???????????// its in a string???
            expect(result.body.articles[0].author).to.equal("icellusedkars");
          });
      });
      it("GET 200, returns an empty array when requesting an author with no articles", () => {
        return request(app)
          .get("/api/articles?author=lurker")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.deep.equal([]);
          });
      });
      it("GET 200, returns all the articles by a topic, sort_by should default to created_at and the order should default to descending", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.be.descendingBy("created_at");
            expect(result.body.articles[0].topic).to.equal("mitch");
          });
      });
      it("GET 200, returns an empty array when requesting a topic with no articles", () => {
        return request(app)
          .get("/api/articles?topic=paper")
          .expect(200)
          .then(result => {
            expect(result.body.articles).to.deep.equal([]);
          });
      });
    });
    describe("/articles ERRORS", () => {
      it("GET 404: should response with a status 404 with msg 'Not Found' when requesting an author that does not exist", () => {
        return request(app)
          .get("/api/articles?author=notAValidAuthor")
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Not a valid user");
          });
      });
      it("GET 404: should response with a status 404 with msg 'Not Found' when request a topic that does no exist", () => {
        return request(app)
          .get("/api/articles?topic=notAValidTopic")
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Topic Not Found");
          });
      });
      it("GET 400: when given an invalid sort_by column, should respond with 'Bad Request", () => {
        //PSQL error sorts it
        return request(app)
          .get("/api/articles?sort_by=notAValidColumn")
          .expect(400)
          .then(result => {
            expect(result.body.msg).to.equal("Bad Request");
          });
      });
      it("GET 400: when given an invalid order request, should respond with 'Bad Request'", () => {
        //custom error
        return request(app)
          .get("/api/articles?order=notValidOrder")
          .expect(400)
          .then(result => {
            expect(result.body.msg).to.equal("Bad Request");
          });
      });
      it("POST /* :405 when other methods are attempted'", () => {
        return request(app)
          .post("/api/articles")
          .send({ hello: "hello" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Found");
          });
      });
      it("PATCH /* :405 when other methods are attempted'", () => {
        return request(app)
          .patch("/api/articles")
          .send({ hello: "hello" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Found");
          });
      });
      it("DELETE /* :405 when other methods are attempted'", () => {
        return request(app)
          .delete("/api/articles")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Found");
          });
      });
    });
  });
  describe("/:article_id", () => {
    describe("/GET", () => {
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
            expect(result.body.article.comment_count).to.equal("13"); // originally set it to be a number but feedback test wanted a string...
            expect(result.body.article.article_id).to.equal(1);
          });
      });
    });
    describe("ERROR /:article_id", () => {
      it("GET 404 / : will return status when article is not found", () => {
        return request(app)
          .get("/api/articles/10000")
          .expect(404)
          .then(result => {
            expect(result.body.msg).to.equal("Not Found");
          });
      });
      it("POST /* :405 when other methods are attempted'", () => {
        return request(app)
          .post("/api/articles/1")
          .send({ hello: "hello" })
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Found");
          });
      });

      it("DELETE /* :405 when other methods are attempted'", () => {
        return request(app)
          .delete("/api/articles/1")
          .expect(405)
          .then(result => {
            expect(result.body.msg).to.equal("Method Not Found");
          });
      });

      describe("GET/:article_id/comments", () => {
        it("GET 200 >> /articles/:articles_id/comments >> should return status 200 when successful , in the correct format including the appropriate key columns", () => {
          return request(app)
            .get("/api/articles/5/comments")
            .expect(200)
            .then(result => {
              expect(result.body.comments).to.be.an("array");
              expect(result.body.comments.length).to.equal(2);
              expect(result.body.comments[0]).to.have.keys(
                "author",
                "comment_id",
                "body",
                "created_at",
                "votes"
              );
            });
        });
        it("GET  >> /articles/:articles_id/comments >> the comments should be sorted by created_at and ordered in descending order by default", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .then(result => {
              expect(result.body.comments).to.be.sortedBy("created_at", {
                descending: true
              });
            });
        });
        it("GET  >> /articles/:articles_id/comments >> the comments should be sorted by created_at by default and ordered in ascending order by request", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .then(result => {
              expect(result.body.comments).to.be.sortedBy("created_at", {
                descending: false
              });
            });
        });
        it("GET  >> /articles/:articles_id/comments >> the comments should be sorted by comment_id by request and ordered by descending order by default", () => {
          return request(app)
            .get("/api/articles/1/comments?sorted_by=comment_id")
            .then(result => {
              expect(result.body.comments).to.be.sortedBy("comment_id", {
                descending: false
              });
            });
        });
        it("GET  >> /articles/:articles_id/comments >> the comments should be sorted by comment_id by request and ordered by ascending order by reqeest", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc&&sort_by=comment_id")
            .then(result => {
              expect(result.body.comments).to.be.sortedBy("comment_id", {
                descending: false
              });
            });
        });
        it("GET  >> /articles/:articles_id/comments >> returns an empty array when requesting an article with no comments", () => {
          return request(app)
            .get("/api/articles/2/comments")
            .then(result => {
              expect(result.body.comments).to.deep.equal([]);
            });
        });
      });
      describe("ERRORS/:article_id/comments", () => {
        it("GET 400: when given an invalid sort_by column, should respond with 'Bad Request", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=notAValidColumn")
            .expect(400)
            .then(result => {
              expect(result.body.msg).to.equal("Bad Request");
            });
        });
        it("GET 400: when given an invalid order column, should respond with 'Bad Request'", () => {
          return request(app)
            .get("/api/articles/1/comments?order=notValidOrder")
            .expect(400)
            .then(result => {
              expect(result.body.msg).to.equal("Bad Request");
            });
        });
        it("GET 400: when request an article that does not exist, should respond with 'Article not found'", () => {
          return request(app)
            .get("/api/articles/99999/comments")
            .expect(404)
            .then(result => {
              expect(result.body.msg).to.equal("Article not found");
            });
        });
        it("GET 400: when request an article in the wrong format, should respond with 'Bad Request'", () => {
          return request(app)
            .get("/api/articles/oneone/comments")
            .expect(400)
            .then(result => {
              expect(result.body.msg).to.equal("Bad Request");
            });
        });
        it("POST /* :405 when other methods are attempted'", () => {
          return request(app)
            .put("/api/articles/1/comments")
            .send({ hello: "hello" })
            .expect(405)
            .then(result => {
              expect(result.body.msg).to.equal("Method Not Found");
            });
        });
        it("DELETE /* :405 when other methods are attempted'", () => {
          return request(app)
            .delete("/api/articles/1/comments")
            .expect(405)
            .then(result => {
              expect(result.body.msg).to.equal("Method Not Found");
            });
        });

        // it("GET 400: when request an query that does not exist, should respond with 'Invalid query'", () => {
        //   return request(app)
        //     .get("/api/articles/1/comments?inValidQuery=asc&invald=bleh")
        //     .expect(400)
        //     .then(result => {
        //       expect(result.body.msg).to.equal("Invalid query");
        //     });
        // });
      });
    });
    describe("/PATCH", () => {
      // NEEED TO DO ERROR HANDLING!!!!
      //
      it("PATCH 200 >> /articles/:articles_id >> will return status 200 and the article requested with an increased vote count", () => {
        let newVote = 18;

        return request(app)
          .patch("/api/articles/2") //method & url
          .send({ inc_votes: newVote }) //body of information sending
          .expect(200)
          .then(result => {
            expect(result.body.article.votes).to.equal(18);
          });
      });
      it("PATCH 200 >> /articles/:articles_id >> will return status 200 and the article requested with a decreased vote count", () => {
        let newVote = -10;

        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: newVote })
          .then(result => {
            expect(result.body.article.votes).to.equal(90);
          });
      });
      it("PATCH 200 >> /articles/:articles_id >> should be return in the correct format and include the appropriate key columns", () => {
        let newVote = 10;
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: newVote })
          .then(result => {
            expect(result.body.article).to.be.an("object");
            expect(result.body.article).to.have.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes"
            );
          });
      });
      it("PATCH / : when patch req with no send value, it just returns the article of the corresponding id with no changes to vote count", () => {
        return request(app)
          .patch("/api/articles/1")
          .then(result => {
            expect(result.body.article.votes).to.equal(100);
          });
      });
      describe("ERROR PATCH >> /articles/:articles_id", () => {
        it("PATCH 404 / : when requesting a patch to a comment that doesnt exist it will return a message with 'Not Found'", () => {
          return request(app)
            .patch("/api/articles/1000000")
            .send({ inc_votes: 10 })
            .expect(404)
            .then(result => {
              expect(result.body.msg).to.equal("Not Found");
            });
        });
      });
    });
    describe("/POST", () => {
      it("POST 201 >> /articles/:articles_id/comments >> should return status 200 when successful and return the comment body", () => {
        const objComment = {
          username: "butter_bridge",
          body: "I give this 10 out of 10!"
        };
        return request(app)
          .post("/api/articles/4/comments")
          .expect(201) /// amend to the correct 2++
          .send(objComment)
          .then(result => {
            expect(result.body).to.be.an("object");
            expect(result.body.comment).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(result.body.comment.body).to.equal(
              "I give this 10 out of 10!"
            );
          });
      });
      it("POST 400 >> /articles/:articles_id/comments >> should return status 500 when trying to post information that doesn't include username", () => {
        const objComment = {
          Bleh: "butter_bridge",
          body: "I give this 10 out of 10!"
        };
        return request(app)
          .post("/api/articles/4/comments")
          .expect(400)
          .send(objComment)
          .then(result => {
            expect(result.body.msg).to.equal("Incorrect column format");
          });
      });
      it("POST 400 >> /articles/:articles_id/comments >> should return status 500 when trying to post information that doesn't include body", () => {
        const objComment = {
          username: "butter_bridge",
          bleh: "I give this 10 out of 10!"
        };
        return request(app)
          .post("/api/articles/5/comments")
          .expect(400)
          .send(objComment)
          .then(result => {
            expect(result.body.msg).to.equal("Incorrect column format");
          });
      });
      it("POST 400 >> /articles/:articles_id/comments >> should return status 500 when trying to post information that doesn't include body or username keys", () => {
        const objComment = {
          Notusername: "butter_bridge",
          bleh: "I give this 10 out of 10!"
        };
        return request(app)
          .post("/api/articles/5/comments")
          .expect(400)
          .send(objComment)
          .then(result => {
            expect(result.body.msg).to.equal("Incorrect column format");
          });
      });
      it("POST 201 >> /articles/:articles_id/comments >> should return status when trying to post comment to an article does not have any comments", () => {
        const objComment = {
          username: "butter_bridge",
          body: "I give this 10 out of 10!"
        };
        return request(app)
          .post("/api/articles/7/comments")
          .expect(201)
          .send(objComment)
          .then(result => {
            expect(result.body.comment.body).to.equal(
              "I give this 10 out of 10!"
            );
          });
      });
      it("POST 404 >> /articles/:articles_id/comments >> should return status when trying to post comment to an article does not exist", () => {
        const objComment = {
          username: "butter_bridge",
          body: "I give this 10 out of 10!"
        };
        return request(app)
          .post("/api/articles/9999/comments")
          .expect(404)
          .send(objComment)
          .then(result => {
            expect(result.body.msg).to.equal("Article Does Not Exist");
          });
      });
    });
  });
  describe("/comments", () => {
    describe("/:user_id", () => {
      it("GET 200 >> /comments/:user_id >> should return status 200 when successful , in the correct format including the appropriate key columns", () => {
        return request(app)
          .get("/api/comments/user/butter_bridge")
          .expect(200)
          .then(result => {
            expect(result.body.comment).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("GET 200 >> /comments/:user_id >> should return status 200 when successful , an empty array when requested comment for a user that exists but who has not made any comments on articles", () => {
        return request(app)
          .get("/api/comments/user/rogersop")
          .expect(200)
          .then(result => {
            expect(result.body.comment).to.deep.equal([]);
          });
      });
      describe("ERROR GET >> /comments/:user_id >>", () => {
        it("GET 404, when trying to get comments for a user that does not exist, should return 404 'User Not Found'", () => {
          return request(app)
            .get("/api/comments/user/FAKEUSERNAME")
            .expect(404)
            .then(result => {
              expect(result.body.msg).to.equal("Not a valid user");
            });
        });
      });
    });

    //rogersop should return an empty array
    describe("/:comment_id", () => {
      it("PATCH 200 >> /comments/:comment_id >> will return status 200 when successful and have the required keys", () => {
        const newVote = 10;
        return request(app)
          .patch("/api/comments/2") //method & url
          .send({ inc_votes: newVote }) //body of information sending
          .expect(200)
          .then(result => {
            expect(result.body.comment).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("PATCH 200 >> /comments/:comment_id >> the comment with the vote count increased by the correct amount", () => {
        const newVote = 10;

        return request(app)
          .patch("/api/comments/2") //method & url
          .send({ inc_votes: newVote }) //body of information sending
          .expect(200)
          .then(result => {
            expect(result.body.comment.votes).to.equal(24);
          });
      });
      it("PATCH 200 >> /comments/:comment_id >> the comment with the vote count decreased by the correct amount", () => {
        const newVote = -10;

        return request(app)
          .patch("/api/comments/2")
          .send({ inc_votes: newVote })
          .expect(200)
          .then(result => {
            expect(result.body.comment.votes).to.equal(4);
          });
      });
      it("PATCH 200 >> /comments/:comment_id >> when trying to patch with something that isn't a number, it will ignore and not increment", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({ inc_votes: "notANumber" })
          .expect(400)
          .then(result => {
            expect(result.body.msg).to.equal("Bad Request");
          });
      });
      it("PATCH 200 / : when patch req with no send value, it just returns the comment of the corresponding id with no changes to vote count", () => {
        return request(app)
          .patch("/api/comments/1")
          .then(result => {
            expect(result.body.comment.votes).to.equal(16);
          });
      });
      it("DELETE 204 / :  returns status 204 when the delete request is successful and return the message 'No Content'", () => {
        return request(app)
          .delete("/api/comments/2")
          .expect(204)
          .then(result => {
            expect(result.res.statusMessage).to.equal("No Content");
          });
      });
      describe("ERROR /:comment_id", () => {
        it("PATCH 404 / : when requesting a patch to a comment that doesnt exist it will return a message with 'Not Found'", () => {
          return request(app)
            .patch("/api/comments/100000")
            .expect(404)
            .then(result => {
              expect(result.body.msg).to.equal("Not Found");
            });
        });
        it("POST /* :405 when other methods are attempted'", () => {
          return request(app)
            .post("/api/comments/1")
            .send({ hello: "hello" })
            .expect(405)
            .then(result => {
              expect(result.body.msg).to.equal("Method Not Found");
            });
        });
        it("DELETE /* :400 return status when'", () => {
          return request(app)
            .delete("/api/comments/notANumber")
            .expect(400)
            .then(result => {
              expect(result.body.msg).to.equal("Bad Request");
            });
        });
        it("DELETE 404 / :  returns status 404 when the delete request is made for an article that does not exist, it will return the message 'Not Found'", () => {
          return request(app)
            .delete("/api/comments/5434453")
            .expect(404)
            .then(result => {
              expect(result.body.msg).to.equal("Not Found");
            });
        });
      });
    });
  });
});
