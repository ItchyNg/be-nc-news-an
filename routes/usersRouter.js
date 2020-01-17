const usersRouter = require("express").Router();
const { getUsernameById } = require("../controllers/users_controllers");
const { send405Error } = require("../errors/index");

usersRouter.get("/:username", getUsernameById);

usersRouter.all("/*", send405Error);

module.exports = usersRouter;
