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

// articlesRouter.get("/:article_id", getArticleById);

// articlesRouter.patch("/:article_id", patchArticleVotesById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(send405Error);

// articlesRouter.post("/:article_id/comments", postCommentById);

// articlesRouter.get("/:article_id/comments", getCommentById);

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(send405Error);

// articlesRouter.get("/", getAllArticles);

// articlesRouter.all("/*", send405Error);

module.exports = articlesRouter;
