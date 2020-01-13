exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .unique(); //creating column username to be unique
    usersTable.string("name");
    usersTable.string("avatar_url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
