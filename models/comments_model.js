const connection = require("../db/connection");

const alterVoteReturnComment = (comment_id, newVote) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .returning("*")
    .increment("votes", newVote || 0)
    .then(result => {
      console.log(result);
      return result;
    });
};

module.exports = { alterVoteReturnComment };
