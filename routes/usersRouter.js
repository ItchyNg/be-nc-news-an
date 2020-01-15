const usersRouter = require("express").Router();
const { getUsernameById } = require("../controllers/users_controllers");

usersRouter.get("/:username", getUsernameById);

module.exports = usersRouter;
