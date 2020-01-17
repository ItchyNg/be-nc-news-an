const {
  selectArticleById,
  changeArticleVotes,
  submittedCommentById,
  selectCommentById,
  fetchAllArticles
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
      res.status(201).send({ newComment: result });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.getCommentById = (req, res, next) => {
  const article_id = req.params.article_id;
  const order = req.query.order;
  const sort_by = req.query.sort_by;
  // const allQuery = req.query;
  // if (allQuery) {
  //   for (let keys in allQuery) {
  //     if (keys !== order || keys !== sort_by) {
  //       console.log("nope");
  //     }
  //   }
  // }

  // console.log(x);

  selectCommentById(order, article_id, sort_by)
    .then(result => {
      res.status(200).send({ comments: result });
    })
    .catch(function(err) {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  const query = req.query; // includes author, topic, order, sort_by

  fetchAllArticles(query)
    .then(result => {
      res.status(200).send({ articles: result });
    })
    .catch(function(err) {
      console.log(err, "controller error");
      next(err);
    });
};
