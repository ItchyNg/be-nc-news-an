const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) =>
  next({ status: 404, msg: "Route not found" })
); // Errors for all other routes not stated above

app.use((err, req, res, next) => {
  //error handler
  const psqlCodes = [];
  if (err.status) res.status(err.status).send({ msg: err.msg }); //  if CUSTOM ERROR MSG
  if (psqlCodes.includes(err.code)) {
    ///THIS IS FOR PSQL ERRORS
  }
});

module.exports = app;
