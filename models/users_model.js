const connection = require("../db/connection");

const selectUsernameById = username => {
  return connection
    .select("username", "avatar_url", "name")
    .from("users")
    .where("username", username)
    .then(result => {
      return result;
    });
};

module.exports = selectUsernameById;
