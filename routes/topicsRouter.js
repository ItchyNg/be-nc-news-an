const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics_controller");

topicsRouter.route("/").get(getTopics);

topicsRouter.get("/*", function(req, res, next) {
  res.status(400).send({ msg: "Bad Request" });
});

module.exports = topicsRouter;
