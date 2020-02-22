const {
  selectArticleById,
  changeArticleVotes,
  submittedCommentByArticleId,
  selectCommentsByArticleId,
  fetchAllArticles
} = require("../models/articles_model");

const selectUsernameById = require("../models/users_model");
const { selectATopic } = require("../models/topics_model");

// GET /articles/:article_id
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(result => {
      res.status(200).send({ article: result });
    })
    .catch(function(err) {
      next(err);
    });
};

// PATCH /aticles/:article_id
exports.patchArticleVotesById = (req, res, next) => {
  const { article_id } = req.params;
  const patchVote = req.body.inc_votes;

  changeArticleVotes(article_id, patchVote)
    .then(result => {
      res.status(200).send({ article: result });
    })
    .catch(function(err) {
      next(err);
    });
};

//POST /articles/:article_id/comments
exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const usernameAndComment = req.body;
  submittedCommentByArticleId(article_id, usernameAndComment)
    .then(result => {
      res.status(201).send({ comment: result });
    })
    .catch(function(err) {
      next(err);
    });
};

//GET /articles/:article_id/comments
exports.getCommentsByArticleId = (req, res, next) => {
  const article_id = req.params.article_id;
  const order = req.query.order;
  const sort_by = req.query.sort_by;

  selectCommentsByArticleId(order, article_id, sort_by)
    .then(result => {
      res.status(200).send({ comments: result });
    })
    .catch(function(err) {
      next(err);
    });
};

//GET /articles
exports.getAllArticles = (req, res, next) => {
  const query = req.query; // includes author, topic, order, sort_by

  if (query.author) {
    selectUsernameById(query.author).catch(function(err) {
      next(err);
    });
  }
  if (query.topic) {
    selectATopic(query.topic).catch(function(err) {
      next(err);
    });
  }

  fetchAllArticles(query)
    .then(result => {
      res.status(200).send({ articles: result });
    })
    .catch(function(err) {
      next(err);
    });
};
