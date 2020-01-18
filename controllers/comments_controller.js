const {
  alterVoteReturnComment,
  commentDeleted
} = require("../models/comments_model");

// PATCH /comments/:comment_id
exports.amendVoteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const newVote = req.body.inc_votes;
  // typeof req.body.inc_votes == "number" ? req.body.inc_votes : 0; // this would ignore the invalid inc_vote rather than erroring out

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
