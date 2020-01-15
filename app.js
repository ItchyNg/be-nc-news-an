const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  //error handler
  console.log(err);
});

module.exports = app;
