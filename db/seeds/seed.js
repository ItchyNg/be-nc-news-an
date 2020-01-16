const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest()) //rollback and latest to reset the database each time it seeded
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const articleConvertTime = formatDates(articleData);

      return knex("articles")
        .insert(articleConvertTime)
        .returning("*");
    })

    .then(articleRows => {
      const articleRef = makeRefObj(articleRows, "title", "article_id");

      const formattedComments = formatComments(commentData, articleRef);

      return knex("comments").insert(formattedComments);
    });
  // .catch(console.log);
};
