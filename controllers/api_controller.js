const endpoints = require("../endpoints.json");

const apiDescription = JSON.stringify(endpoints);

console.log(apiDescription);

exports.getApiDescription = (req, res, next) => {
  res.status(200).send({ api: apiDescription });
};
