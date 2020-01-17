const commentsRouter = require("express").Router();
const {
  amendVoteByCommentId,
  deleteCommentById
} = require("../controllers/comments_controller");

const { send405Error } = require("../errors/index");

commentsRouter.patch("/:comment_id", amendVoteByCommentId);

commentsRouter.delete("/:comment_id", deleteCommentById);

commentsRouter.all("/*", send405Error);

module.exports = commentsRouter;
