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

app.all("/*", errorForOtherRoutes);

app.use(customErrorMsg);
app.use(psqlErrorMsg);

module.exports = app;
