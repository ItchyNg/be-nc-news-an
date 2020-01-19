const endpoints = require("../endpoints.json");

const stringy = JSON.stringify(endpoints);

console.log(stringy);

exports.getApiDescription = (req, res, next) => {
  res.status(200).send({ api: apiDescription });
};
