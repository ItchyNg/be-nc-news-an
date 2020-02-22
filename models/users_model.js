const connection = require("../db/connection");

const selectUsernameById = username => {
  return connection
    .select("username", "avatar_url", "name")
    .from("users")
    .where("username", username)
    .then(result => {
      return result.length === 0
        ? Promise.reject({
            status: 404,
            msg: "Not a valid user"
          })
        : result[0];
    });
};

module.exports = selectUsernameById;
