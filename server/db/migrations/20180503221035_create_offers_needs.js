exports.up = function(knex, Promise) {
  return knex.schema.createTable('offers_needs', function(table) {
    table.increments();
    table.string('title');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('offers_needs')

};