const connection = require("../db/connection");

const selectTopics = () => {
  return connection
    .select("description", "slug")
    .from("topics")
    .then(result => {
      return result;
    });
};

module.exports = selectTopics;
