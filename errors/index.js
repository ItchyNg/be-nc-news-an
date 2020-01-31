exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Found" });
};

exports.errorForOtherRoutes = (req, res, next) =>
  next({ status: 404, msg: "Route Not Found" });

exports.customErrorMsg = (err, req, res, next) => {
  //error handler
  if (err.status) {
    res.status(err.status).send({ msg: err.msg || "Bad Request" });
  }
  //  if CUSTOM ERROR MSG
  else next(err);
};

exports.psqlErrorMsg = (err, req, res, next) => {
  //error handler
  const psqlErr = {
    "42703": [400, "Bad Request"],
    "22P02": [400, "Bad Request"]
  };
  if (Object.keys(psqlErr).includes(err.code)) {
    res.status(psqlErr[err.code][0]).send({ msg: psqlErr[err.code][1] });
  } else res.sendStatus(500);
};
