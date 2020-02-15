const connection = require("../db/connection");

const selectTopics = () => {
  return connection
    .select("description", "slug")
    .from("topics")
    .then(result => {
      return result;
    });
};

const selectATopic = topic => {
  return connection
    .select("*")
    .from("topics")
    .where("slug", topic)
    .then(result => {
      return result.length === 0
        ? Promise.reject({
            status: 404,
            msg: "Topic Not Found"
          })
        : result[0];
    });
};
module.exports = { selectTopics, selectATopic };
