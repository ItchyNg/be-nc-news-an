const selectUsernameById = require("../models/users_model");

exports.getUsernameById = (req, res, next) => {
  const { username } = req.params;

  selectUsernameById(username)
    .then(resultUserById => {
      res.status(200).send({ user: resultUserById });
    })
    .catch(function(err) {
      next(err);
    });
};
