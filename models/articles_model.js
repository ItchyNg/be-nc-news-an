const connection = require("../db/connection");

const selectArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(result => {
      //if you are patching would you want to mutate the db??????
      result[0].comment_count = +result[0].comment_count;
      return result[0];
    });
};

const changeArticleVotes = (article_id, patchVote) => {
  return selectArticleById(article_id).then(result => {
    result.votes += patchVote;
    return result;
  });
};

const submittedCommentById = article_id => {
  // return selectArticleById(article_id).then(result => {
  //   console.log(result);
  //   return result;
  // });
  return connection
    .select("*")
    .from("comments")
    .then(result => {
      console.log(result);
      return result;
    });
  //need to put a new comment in the comment array
  // make sure the article comment count goes up
  //returns the comment body
};

module.exports = {
  selectArticleById,
  changeArticleVotes,
  submittedCommentById
};
