const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  errorForOtherRoutes,
  customErrorMsg,
  psqlErrorMsg
} = require("./errors/index");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", function(req, res) {
  res.send("hello world");
});

app.all("/*", errorForOtherRoutes); // Errors for all other routes not stated above

app.use(customErrorMsg);
app.use(psqlErrorMsg);

// app.use((err, req, res, next) => {
//   //error handler
//   const psqlErr = {
//     "42703": [400, "Bad Request"],
//     "22P02": [400, "Bad Request"]
//   };
//   if (err.status)
//     res.status(err.status).send({ msg: err.msg || "Bad Request" }); //  if CUSTOM ERROR MSG

//   if (Object.keys(psqlErr).includes(err.code)) {
//     res.status(psqlErr[err.code][0]).send({ msg: psqlErr[err.code][1] });
//   } ///THIS IS FOR PSQL ERRORS
//   else res.sendStatus(500);
// });

module.exports = app;
