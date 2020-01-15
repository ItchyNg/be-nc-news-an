const {
  selectArticleById,
  changeArticleVotes
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
  console.log(req.body, "<<<<<<");

  changeArticleVotes(article_id)
    .then(result => {
      res.status(200).send({ article: result });
    })
    .catch(function(err) {
      next(err);
    });
};
