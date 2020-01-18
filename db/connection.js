const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");

// const dbConfig = require("../knexfile");

// //does the same as knex seed:run, goes into the knexfile, looks for seed and then runs whatevers in the config (connecting the correct database), which is then used in the seed.js file as the data. This is for the server

// const connection = knex(dbConfig);

// module.exports = connection;

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");

module.exports = knex(dbConfig);

// the above should check whether you're in production, and if you are, it should connect to the production database. Otherwise it will connect to the (.gitignore'd) knex file.
