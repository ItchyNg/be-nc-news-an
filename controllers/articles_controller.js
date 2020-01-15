const {
  selectArticleById,
  changeArticleVotes,
  submittedCommentById
} = require("../models/articles_model");

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

exports.postCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const usernameAndComment = req.body;
  submittedCommentById(article_id, usernameAndComment)
    .then(result => {
      res.status(200).send({ newComment: result });
    })
    .catch(function(err) {
      next(err);
    });
};
