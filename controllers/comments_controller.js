const { alterVoteReturnComment } = require("../models/comments_model");

exports.amendVoteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const newVote = req.body.inc_votes;
  console.log(comment_id);
  alterVoteReturnComment(comment_id, newVote)
    .then(result => {
      res.status(200).send({ comment: result });
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    });
};
