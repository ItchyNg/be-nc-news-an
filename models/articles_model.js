const connection = require("../db/connection");

const selectArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(result => {
      //if you are patching would you want to mutate the db??????
      result[0].comment_count = +result[0].comment_count;
      return result[0];
    });
};

const changeArticleVotes = (article_id, patchVote) => {
  // return selectArticleById(article_id).increment("votes", patchVote) });
  return selectArticleById(article_id).then(result => {
    result.votes += patchVote;
    return result;
  });
};

const submittedCommentById = (article_id, usernameAndComment) => {
  // const newComment = {
  //   //formatted comment
  //   author: usernameAndComment.username,
  //   article_id: +article_id,
  //   votes: 0,
  //   created_at: new Date(),
  //   body: usernameAndComment.body
  // };
  // return (
  //   connection("comments")
  //     .insert(newComment)
  //     //.select("*")
  //     .then(result => {
  //       console.log(result);
  //       return result;
  //     })
  // );
  /////////////////////////////////
  return connection
    .select("*")
    .from("comments")
    .then(result => {
      const max = result.reduce(function(prev, current) {
        return prev.comment_id > current.comment_id ? prev : current;
      }); //finds the highest comment_id
      const newComment = {
        //formatted comment
        comment_id: max.comment_id + 1,
        author: usernameAndComment.username,
        article_id: +article_id,
        votes: 0,
        created_at: new Date(),
        body: usernameAndComment.body
      };
      result.push(newComment); //push it into the comments
      //console.log(result, result.length);
      return newComment.body;
    });
  //need to put a new comment in the comment array
  // make sure the article comment count goes up???
  //returns the comment body
  //INSERT INTO houses (columns) VALUES (""${houseToAdd.house_name}, only works using knex?
};

const selectCommentById = (order, article_id, sort_by) => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      if (order) {
        if (order !== "desc" && order !== "asc") {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
      }
      return result;
    });
};

module.exports = {
  selectArticleById,
  changeArticleVotes,
  submittedCommentById,
  selectCommentById
};
