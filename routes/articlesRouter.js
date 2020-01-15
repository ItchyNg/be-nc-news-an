const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById,
  postCommentById
} = require("../controllers/articles_controller");

articlesRouter.get("/:article_id", getArticleById);

articlesRouter.patch("/:article_id", patchArticleVotesById);

articlesRouter.post("/:article_id/comments", postCommentById);

module.exports = articlesRouter;
