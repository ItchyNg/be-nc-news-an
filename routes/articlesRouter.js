const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById,
  postCommentById,
  getCommentById,
  getAllArticles
} = require("../controllers/articles_controller");

const { send405Error } = require("../errors/index");

articlesRouter.get("/:article_id", getArticleById);

articlesRouter.patch("/:article_id", patchArticleVotesById);

articlesRouter.post("/:article_id/comments", postCommentById);

articlesRouter.get("/:article_id/comments", getCommentById);

articlesRouter.get("/", getAllArticles);

articlesRouter.all("/*", send405Error);

module.exports = articlesRouter;
