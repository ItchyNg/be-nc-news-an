const connection = require("../db/connection");

const selectUsernameById = username => {
  return connection
    .select("username", "avatar_url", "name")
    .from("users")
    .where("username", username)
    .then(result => {
      return result.length === 0 //if the result comes back with nothing then force it to reject and send error, if not return the results
        ? Promise.reject({
            status: 404,
            msg: "Not a valid user"
          })
        : result[0];
    });
};

module.exports = selectUsernameById;
