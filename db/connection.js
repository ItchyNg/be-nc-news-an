const knex = require("knex");
const dbConfig = require("../knexfile");

//does the same as knex seed:run, goes into the knexfile, looks for seed and then runs whatevers in the config (connecting the correct database), which is then used in the seed.js file as the data. This is for the server

const connection = knex(dbConfig);

module.exports = connection;
