exports.up = function(knex) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable
      .increments("article_id")
      .primary()
      .unique(); //articles primary key
    articlesTable.string("title");
    articlesTable.string("topic").references("topics.slug"); //to reference the slug in the topics table
    articlesTable.string("author").references("users.username"); //to reference the user's primary key (username)
    articlesTable.string("body");
    articlesTable.timestamp("created_at"); //to defaults to the current timestamp
    articlesTable.integer("votes").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
