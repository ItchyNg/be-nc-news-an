const {
  alterVoteReturnComment,
  commentDeleted
} = require("../models/comments_model");

exports.amendVoteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  // const newVote =
  //   typeof req.body.inc_votes == "number" ? req.body.inc_votes : 0;
  // console.log(newVote); //forgot

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
