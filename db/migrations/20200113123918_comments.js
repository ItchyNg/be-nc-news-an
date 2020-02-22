exports.up = function(knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").notNullable();
    commentsTable
      .string("author")
      .references("users.username")
      .notNullable();
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable()
      .onDelete("CASCADE"); // Deletes all comments when the article they are related to is deleted
    commentsTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    commentsTable
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable();
    commentsTable.text("body");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
