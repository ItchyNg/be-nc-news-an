const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topicsRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
// const getApiDescription = require("../controllers/api_controller");
const { send405Error } = require("../errors/index");
const endpoints = require("../endpoints.json");
// const apiDescription = JSON.stringify(endpoints);

apiRouter.get("/", function(req, res, next) {
  res.status(200).send({ API_GUIDE: endpoints });
});

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

// apiRouter.get("/", getApiDescription);

apiRouter.all("/", send405Error);

module.exports = apiRouter;
