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
    .increment("votes", patchVote || 0)
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
    return Promise.reject({ status: 400, msg: "Incorrect column format" });
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
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then(articlerows => {
      if (articlerows.length) {
        return connection
          .select("comment_id", "votes", "created_at", "author", "body")
          .from("comments")
          .where("article_id", article_id)
          .orderBy(sort_by || "created_at", order || "desc");
      } else {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
    })
    .then(result => {
      console.log(result);
      if (order) {
        if (order !== "desc" && order !== "asc") {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
      }
      return result;
    });
};

const fetchAllArticles = query => {
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
      .count({ comment_count: "comment_id" })
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      //to add modify if the author and topic are present to put a where into the promise object chain //'lurker' //"icellusedkars"
      .orderBy(query.sort_by || "created_at", query.order || "desc")
      .modify(filterByQuery => {
        if (query.author) {
          filterByQuery.where("articles.author", query.author);
        }
        if (query.topic) {
          filterByQuery.where("articles.topic", query.topic);
        }
      })
      .then(result => {
        if (query.order) {
          //error handling for order and sort_by
          if (query.order !== "desc" && query.order !== "asc") {
            return Promise.reject({ status: 400, msg: "Bad Request" });
          }
        }
        if (!result.length && query.author) {
          //andling for empty array or result with nothing inside
          return connection
            .select("*")
            .from("users")
            .returning("*")
            .where("users.username", query.author); //query.author
        } else if (!result.length && query.topic) {
          return connection
            .select("*")
            .from("topics")
            .returning("*")
            .where("topics.slug", query.topic); //query.topic
        } else {
          return result;
        }
      })
      .then(usersRows => {
        if (usersRows.length) {
          return usersRows[0].author //if the req column exists....etc...
            ? usersRows
            : usersRows[0].topic
            ? usersRows
            : []; //if not empty array, dont want to return a table of other stuff
        } else {
          return Promise.reject({
            //topic or author doesnt exist -> reject
            status: 404,
            msg: "User Not Found"
          });
        }
      })
  );
}; //done!!!!

module.exports = {
  selectArticleById,
  changeArticleVotes,
  submittedCommentById,
  selectCommentById,
  fetchAllArticles
};
