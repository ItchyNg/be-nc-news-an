exports.up = function(knex) {
  //we want to create the topics table here

  return knex.schema.createTable("topics", topicsTable => {
    topicsTable
      .string("slug")
      .unique()
      .primary(); //creating the column names here, slug should be unique enough to act as the primary key
    topicsTable.string("description"); //creating the column names here
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
