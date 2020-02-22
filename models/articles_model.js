const connection = require("../db/connection");

// GET/articles/:article_id
const selectArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(result => {
      if (!result.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return result[0];
    });
};

// PATCH /articles/:article_id
const changeArticleVotes = (article_id, patchVote) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .returning("*")
    .increment("votes", patchVote || 0)
    .then(result => {
      if (!result.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return result[0];
    });
};

//POST /articles/:article_id/comments
const submittedCommentByArticleId = (article_id, usernameAndComment) => {
  const newComment = {
    author: usernameAndComment.username,
    article_id: article_id,
    body: usernameAndComment.body
  };

  if (!newComment.author || !newComment.body) {
    return Promise.reject({ status: 400, msg: "Incorrect column format" });
  }

  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then(articlerows => {
      if (articlerows.length) {
        return connection("comments")
          .insert(newComment)
          .returning("*");
      } else {
        return Promise.reject({
          status: 404,
          msg: "Article Does Not Exist"
        });
      }
    })
    .then(result => {
      return result[0];
    });
};

//GET /articles/:article_id/comments
const selectCommentsByArticleId = (order, article_id, sort_by) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then(articlerows => {
      if (articlerows.length) {
        return connection
          .select("comment_id", "votes", "created_at", "author", "body")
          .from("comments")
          .where("article_id", article_id)
          .orderBy(sort_by || "created_at", order || "desc");
      } else {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
    })
    .then(result => {
      if (order) {
        if (order !== "desc" && order !== "asc") {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
      }
      return result;
    });
};

//GET /articles
const fetchAllArticles = query => {
  return connection
    .select(
      "articles.title",
      "articles.author",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(query.sort_by || "created_at", query.order || "desc")
    .modify(filterByQuery => {
      if (query.author) {
        filterByQuery.where("articles.author", query.author);
      }
      if (query.topic) {
        filterByQuery.where("articles.topic", query.topic);
      }
    })
    .then(result => {
      if (query.order) {
        if (query.order !== "desc" && query.order !== "asc") {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
      }
      return result;
    });
};

module.exports = {
  selectArticleById,
  changeArticleVotes,
  submittedCommentByArticleId,
  selectCommentsByArticleId,
  fetchAllArticles
};
