const commentsRouter = require("express").Router();
const { amendVoteByCommentId } = require("../controllers/comments_controller");

const { send405Error } = require("../errors/index");

commentsRouter.patch("/:comment_id", amendVoteByCommentId);

//commentsRouter.all("/*", send405Error);

module.exports = commentsRouter;
