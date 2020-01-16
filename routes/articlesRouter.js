const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById,
  postCommentById,
  getCommentById
} = require("../controllers/articles_controller");

articlesRouter.get("/:article_id", getArticleById);

articlesRouter.patch("/:article_id", patchArticleVotesById);

articlesRouter.post("/:article_id/comments", postCommentById);

articlesRouter.get("/:article_id/comments", getCommentById);

module.exports = articlesRouter;
