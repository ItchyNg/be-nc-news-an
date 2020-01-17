const {
  alterVoteReturnComment,
  commentDeleted
} = require("../models/comments_model");

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

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  commentDeleted(comment_id)
    .then(result => {
      res.status(204).send();
    })
    .catch(function(err) {
      next(err);
    });
};
