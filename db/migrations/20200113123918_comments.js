exports.up = function(knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").notNullable();
    commentsTable
      .string("author")
      .references("users.username")
      .notNullable(); //should reference users primary key (username)
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable(); //should reference articles primary key
    commentsTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    commentsTable
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable(); //to defaults to the current timestamp
    commentsTable.text("body");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
