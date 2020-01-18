const connection = require("../db/connection");

// PATCH /comments/:comment_id
const alterVoteReturnComment = (comment_id, newVote) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .returning("*")
    .increment("votes", newVote || 0)
    .then(result => {
      return !result.length
        ? Promise.reject({ status: 404, msg: "Not Found" })
        : result[0];
    });
};

// DELETE /comments/:comment_id
const commentDeleted = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .del();
};

module.exports = { alterVoteReturnComment, commentDeleted };
