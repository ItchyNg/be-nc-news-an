const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getAllArticles
} = require("../controllers/articles_controller");

const { send405Error } = require("../errors/index");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVotesById)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(send405Error);

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(send405Error);

module.exports = articlesRouter;
