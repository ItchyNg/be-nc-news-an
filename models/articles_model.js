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
      result[0].comment_count = +result[0].comment_count;
      return result[0];
    });
};

const changeArticleVotes = article_id => {
  return selectArticleById(article_id).then(result => {
    console.log(result);
    return result;
  });
};
module.exports = { selectArticleById, changeArticleVotes };
