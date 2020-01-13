exports.up = function(knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id");
    commentsTable.string("author").references("users.username"); //should reference users primary key (username)
    commentsTable.integer("article_id").references("articles.article_id"); //should reference articles primary key
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at"); //to defaults to the current timestamp
    commentsTable.string("body");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
