const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", function(req, res) {
  res.send("hello world");
});

app.all("/*", (req, res, next) =>
  next({ status: 404, msg: "Route Not Found" })
); // Errors for all other routes not stated above

app.use((err, req, res, next) => {
  //error handler
  const psqlErr = {
    "42703": [400, "Bad Request"],
    "22P02": [400, "Bad Request"]
  };
  if (err.status)
    res.status(err.status).send({ msg: err.msg || "Bad Request" }); //  if CUSTOM ERROR MSG

  if (Object.keys(psqlErr).includes(err.code)) {
    res.status(psqlErr[err.code][0]).send({ msg: psqlErr[err.code][1] });
  } ///THIS IS FOR PSQL ERRORS
  else res.sendStatus(500);
});

module.exports = app;
