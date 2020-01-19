const endpoints = require("../endpoints.json");

const apiDescription = JSON.stringify(endpoints);

exports.getApiDescription = (req, res, next) => {
  res.status(200).send({ api: apiDescription });
};
