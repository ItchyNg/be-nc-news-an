# Northcoders News API

The aim of this project was to build RESTful APIs to serve data on articles, users, topics and comments. This makes up the Bankend half of the overall NC News project and will serve this data to the Front End.

The was completed using Node, Express, Knex and PostgreSQL. Tested using Mocha Chai and Supertest.

Link to hosted heroku app: http://itch-nc-news-app.herokuapp.com/api

## Getting Started

- Fork and Clone this repo
- npm install knex pg express
- npm i -D mocha chai supertest chai-sorted chai-things

### Prerequisites

What things you need to install the software and how to install them

Ensure that you have PostgreSQL v7.17.1
Express.js v4.17.1
Knex.js v0.20.8
NodeJs v...

### Installing - Knexfile.js

Create a knexfiles.js within the root of the repo and copy the below code in. A user and password may be required if using linux.

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news"
      <!-- user: "",
      password: "" -->
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      <!-- user: "",
      password: "" -->
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
       <!-- user: "",
      password: "" -->
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

```

## Setting up the database and seeding

Run the following commands to set up the database.

```
npm run setup-dbs
npm run migrate-latest
```

Run one of the below to seed the database with the test database of the dev database.

```
npm run seed-test
 OR
npm run seed
```

## Running the tests

To test the server endpoints (./spec/app.spec.js):

```
npm test
```

To test the utility functions (spec/utils.spec.js):

```
npm run test-utils
```

## Using the API

See below for all the endpoints:

```

"GET /api":
Serves up a json representation of all the available endpoints of the api

"GET /api/topics":
Serves an array of all topics.

"GET /api/users/:username":
Serves an object of the user by their username.

"GET /api/articles":
Serves an array of all articles.

"GET /api/articles/:article_id":
Serves an object of an article by their article id.

"PATCH /api/articles/:article_id":
Increases the vote number by a determined amount in relation to a specific article.

"GET/api/articles/:article_id/comments":
This responds with an array of comments for the given article_id.

"POST/api/articles/:article_id/comments":
This will accept an object with the following properties {username: 'username', body: 'body'} and post a comment into the article by the id.

"GET/api/comments/users/:username":
This responds with an array of comments for the given user.

"PATCH/api/comments/:comment_id":
Increases the vote number by a determined amount in relation to a specific article.

"DELETE/api/comments/:comment_id":
Should delete a comment by the comment_id.

```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

## Contributing

## Versioning

## Authors

- **Andrew Ng** - NorthCoders News

## Acknowledgments

Special mentions to the Tutors at NorthCoders
