exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .unique()
      .notNullable(); //creating column username to be unique
    usersTable.string("name").notNullable();
    usersTable.string("avatar_url").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
