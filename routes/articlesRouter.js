const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById
} = require("../controllers/articles_controller");

articlesRouter.get("/:article_id", getArticleById);

articlesRouter.patch("/:article_id", patchArticleVotesById);

module.exports = articlesRouter;
