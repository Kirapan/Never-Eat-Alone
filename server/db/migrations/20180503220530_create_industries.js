exports.up = function(knex, Promise) {
  return knex.schema.createTable('industries', function(table) {
    table.increments();
    table.string('title');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('industries')
};