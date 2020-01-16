const connection = require("../db/connection");

// const article = article_id => {
//   return connection
//     .select("*")
//     .from("articles")
//     .where("article_id", article_id)
//     .then(result => {
//       return result;
//     });
// };

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
  // return selectArticleById(article_id).increment("votes", patchVote) });
  // return selectArticleById(article_id).then(result => {
  //   result.votes += patchVote;
  //   return result;
  // });

  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .returning("*")
    .increment("votes", patchVote)
    .then(result => {
      return result[0];
    });
};

const submittedCommentById = (article_id, usernameAndComment) => {
  const newComment = {
    author: usernameAndComment.username,
    article_id: article_id,
    body: usernameAndComment.body
  };

  if (!newComment.author || !newComment.body) {
    return Promise.reject({ status: 500, msg: "Incorrect column format" });
  }

  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then(articlerows => {
      if (articlerows.length) {
        return connection("comments")
          .insert(newComment)
          .returning("*");
      } else {
        return Promise.reject({
          status: 404,
          msg: "Article Does Not Exist"
        });
      }
    })
    .then(result => {
      return result[0];
    });
  //   return connection("comments")
  //     .insert(newComment)
  //     .returning("*")
  //     .then(result => {
  //       // console.log(result, "results in here!!!!<!<!!<");
  //       return result[0];
  //     });
};

const selectCommentById = (order, article_id, sort_by) => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } //but maybe there is no comments but that article exist so it should return an empty array and not error
      if (order) {
        if (order !== "desc" && order !== "asc") {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
      }
      return result;
    });
};

const fetchAllArticles = (author, topic, order, sort_by) => {
  return (
    connection
      .select(
        "articles.title",
        "articles.author",
        "articles.article_id",
        "articles.topic",
        "articles.created_at",
        "articles.votes"
      )
      .from("articles")
      //.where("articles.article_id", article_id)
      .count({ comment_count: "comment_id" })
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .then(result => {
        //if you are patching would you want to mutate the db??????
        result[0].comment_count = +result[0].comment_count;
        return result;
      })
  );
};

module.exports = {
  selectArticleById,
  changeArticleVotes,
  submittedCommentById,
  selectCommentById,
  fetchAllArticles
};
