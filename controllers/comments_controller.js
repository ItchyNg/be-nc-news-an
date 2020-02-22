const {
  selectCommentsByUserId,
  alterVoteReturnComment,
  commentDeleted
} = require("../models/comments_model");

const selectUsernameById = require("../models/users_model");

// GET /comments/:user_id
exports.getCommentsByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const order = req.query.order;
  const sort_by = req.query.sort_by;

  if (order) {
    if (order !== "desc" && order !== "asc") {
      res.status(400).send({ msg: "Bad Request" });
    }
  }

  selectUsernameById(user_id)
    .then(() => selectCommentsByUserId(user_id, order, sort_by))
    .then(result => {
      res.status(200).send({ comments: result });
    })
    .catch(function(err) {
      next(err);
    });
};

// PATCH /comments/:comment_id
exports.amendVoteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const newVote = req.body.inc_votes;
  alterVoteReturnComment(comment_id, newVote)
    .then(result => {
      res.status(200).send({ comment: result });
    })
    .catch(function(err) {
      next(err);
    });
};

// DELETE /comments/:comment_id
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  commentDeleted(comment_id)
    .then(result => {
      if (result !== 0) {
        res.status(204).send();
      } else {
        res.status(404).send({ msg: "Not Found" });
      }
    })
    .catch(function(err) {
      next(err);
    });
};
