exports.up = function(knex) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable
      .increments("article_id")
      .primary()
      .unique()
      .notNullable(); //articles primary key
    articlesTable.string("title").notNullable();
    articlesTable
      .string("topic")
      .references("topics.slug")
      .notNullable(); //to reference the slug in the topics table
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable(); //to reference the user's primary key (username)
    articlesTable.string("body");
    articlesTable
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable(); //to defaults to the current timestamp, will have a default value of the current timestamp and set it to the time it was invoked.
    articlesTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
