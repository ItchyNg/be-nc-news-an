const commentsRouter = require("express").Router();
const {
  getCommentsByUserId,
  amendVoteByCommentId,
  deleteCommentById
} = require("../controllers/comments_controller");

const { send405Error } = require("../errors/index");
commentsRouter
  .route("/:comment_id")
  .patch(amendVoteByCommentId)
  .delete(deleteCommentById)
  .all(send405Error);

commentsRouter
  .route("/user/:user_id/")
  .get(getCommentsByUserId)
  .all(send405Error);

module.exports = commentsRouter;
